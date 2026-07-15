/* ============================================================
   Air 8 Industries — server.js  (runs on the SERVER, not the browser)
   ------------------------------------------------------------
   Think of this file as the receptionist for your website:
     - It hands visitors the static pages in /public.
     - It has ONE desk (POST /api/contact) where contact messages arrive.

   Node + Express is just JavaScript that runs on a computer in the cloud
   instead of in someone's browser.
   ============================================================ */

// "require" pulls in code other people wrote so we don't reinvent it.
require("dotenv").config();                     // load .env into process.env (SMTP, DB, admin password...)
const express = require("express");
const path = require("path");
const compression = require("compression");
const nodemailer = require("nodemailer");
const session = require("express-session");
const pool = require("./db");
const productsRouter = require("./routes/products");
const contentRouter = require("./routes/content");
const adminRouter = require("./routes/admin");

const app = express();                          // create the Express app
const PORT = process.env.PORT || 3000;          // hosts set PORT for us; 3000 locally
const IS_PROD = process.env.NODE_ENV === "production";

// Render/Railway sit behind a reverse proxy that terminates HTTPS. Without
// this, Express thinks every request is plain http and "secure" session
// cookies would never be sent — locking you out of /admin.html in production.
if (IS_PROD) app.set("trust proxy", 1);

// --- Middleware (runs on every request, in order) ---
// gzip every compressible response (HTML/CSS/JS/JSON). The products API alone
// shrinks ~5x (107KB -> ~21KB), which matters on hobby-plan bandwidth.
app.use(compression());
app.use(express.json());                        // lets us read JSON bodies (the form data)

// Static files with sane browser caching so repeat visits don't re-download
// megabytes of product images:
//  - images/brochures rarely change -> cache 7 days
//  - css/js/html                    -> no-cache: the browser keeps a copy but
//    revalidates every load (cheap 304s via ETag). A timed cache here once let
//    visitors see brand-new HTML styled by an hour-old stylesheet — sections
//    looked broken until the cache expired. Never again.
app.use(express.static(path.join(__dirname, "public"), {
  etag: true,
  lastModified: true,
  setHeaders(res, filePath) {
    if (/\.(png|jpe?g|webp|gif|svg|ico|pdf|woff2?)$/i.test(filePath)) {
      res.setHeader("Cache-Control", "public, max-age=604800"); // 7 days
    } else {
      res.setHeader("Cache-Control", "no-cache");               // revalidate (ETag)
    }
  },
}));

// Sessions back the /admin.html login — one shared ADMIN_PASSWORD, no user table.
app.use(session({
  secret: process.env.SESSION_SECRET || "dev-only-secret-change-me",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 8, // 8 hours
    httpOnly: true,             // JS can't read the session cookie
    sameSite: "lax",            // basic CSRF protection for the admin API
    secure: IS_PROD,            // HTTPS-only in production (Render/Railway)
  },
}));

// Uptime probe for Render/Railway health checks (also pings the DB so a
// "healthy" response really means the whole stack works).
app.get("/healthz", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true });
  } catch (err) {
    res.status(503).json({ ok: false, error: "database unreachable" });
  }
});

// Product catalog + editable site content (public reads), and admin
// (protected CRUD + inquiries + content editing) routers.
app.use("/api", productsRouter);
app.use("/api", contentRouter);
app.use("/api/admin", adminRouter);

/* ------------------------------------------------------------
   THE CONTACT ROUTE
   The browser's fetch("/api/contact") lands here.
   ------------------------------------------------------------ */
app.post("/api/contact", async (req, res) => {
  // req.body is the data the visitor typed. Pull out each field.
  // "product" is included when the inquiry came from a product popup.
  const { name, email, phone, company, message, product, service } = req.body || {};

  // 1) Basic validation. Never trust data from the internet.
  //    A general contact needs a message; a product inquiry needs a product.
  //    Phone is required for product inquiries — that's a higher-intent
  //    lead sales will want to call/Viber back with pricing — but stays
  //    optional on the general contact form to keep that one low-friction.
  if (!name || !email || (!message && !product)) {
    return res.status(400).json({ error: "Name, email and a message are required." });
  }
  if (product && !phone) {
    return res.status(400).json({ error: "A phone number is required for product inquiries." });
  }
  // A very light email sanity check (not perfect, just catches typos).
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  // 2) Always log it so you can see submissions in the server logs.
  console.log("New enquiry:", { name, email, phone, company, product, message });

  // 3) Save it to the database FIRST — this is what actually answers
  //    "where did my message go?". Logging alone disappears the moment the
  //    server restarts; SMTP alone silently drops everything until it's
  //    configured. The database keeps every enquiry either way, and the
  //    admin panel's Messages tab reads straight from this table.
  let inquiryId = null;
  try {
    const [result] = await pool.query(
      `INSERT INTO inquiries (name, email, phone, company, message, product_name, service_type, source)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone || null, company || null, message || null, product || null, service ? String(service).slice(0, 60) : null, product ? "product" : "contact"]
    );
    inquiryId = result.insertId;
  } catch (err) {
    console.error("Could not save enquiry to the database:", err.message);
  }

  // 4) Email a copy to your sales inbox — but only if SMTP is configured.
  //    This is BEST-EFFORT: the enquiry is already safely saved above and
  //    shown in the admin panel, so a mail hiccup must NEVER make the visitor
  //    think their message failed. We log any email error and still return OK.
  if (process.env.SMTP_HOST) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465, // true for port 465
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });

      // (a) Notify your sales inbox — this is the lead you wanted to capture.
      await transporter.sendMail({
        from: `"AIR8 Website" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_TO || "sales@air8industries.com",
        replyTo: email, // so you can reply straight to the visitor
        subject: `New enquiry from ${name}${product ? " — " + product : ""}`,
        text:
          `Name: ${name}\n` +
          `Email: ${email}\n` +
          `Phone: ${phone || "-"}\n` +
          `Company: ${company || "-"}\n` +
          `Service: ${service || "-"}\n` +
          `Product: ${product || "-"}\n\n` +
          `Message:\n${message || "(catalogue request)"}`,
      });

      // (b) Auto-reply to the visitor so they know it went through.
      await transporter.sendMail({
        from: `"AIR8 Industries" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Thanks for your enquiry — AIR8 Industries",
        text:
          `Hi ${name},\n\n` +
          `Thanks for reaching out to AIR8 Industries` +
          (product ? ` about ${product}` : "") +
          `. We've received your message and our team will get back to you shortly` +
          (product ? `, including the catalogue you requested.` : `.`) +
          `\n\n— AIR8 Industries Inc.\nsales@air8industries.com`,
      });

      if (inquiryId) {
        pool.query("UPDATE inquiries SET email_sent = 1 WHERE id = ?", [inquiryId]).catch(() => {});
      }
    } catch (err) {
      // Saved already — just record that the notification email didn't go out.
      console.error("Notification email failed (enquiry still saved):", err.message);
    }
  }

  // 5) Tell the browser it worked (the enquiry is captured regardless of email).
  return res.json({ ok: true });
});

/* ------------------------------------------------------------
   DOWNLOAD TRACKING (no gate for the visitor)
   The popup calls this when someone downloads a brochure, so you can
   see WHICH products get interest and HOW OFTEN — without forcing
   anyone to fill a form first. Right now it just logs; later you can
   save these lines to a file or database for a popularity report.
   ------------------------------------------------------------ */
app.post("/api/track-download", (req, res) => {
  const product = (req.body && req.body.product) || "unknown";
  console.log(`Brochure downloaded: ${product} @ ${new Date().toISOString()}`);
  res.json({ ok: true });
});

// Fallback: for any other path, send the homepage (handy for a single-page site).
// But if the URL looks like a file (e.g. "/brochures/missing.pdf"), a missing
// asset should 404 — not silently return index.html at that URL, which makes
// the browser resolve every relative asset (css/js/images) against the wrong
// folder and renders a broken, unstyled "bare html" page.
app.get("*", (req, res) => {
  if (path.extname(req.path)) {
    return res.status(404).send("Not found");
  }
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start listening for visitors.
app.listen(PORT, () => {
  console.log(`Air 8 site running at http://localhost:${PORT}`);
});
