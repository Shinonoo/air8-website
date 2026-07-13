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
const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();                          // create the Express app
const PORT = process.env.PORT || 3000;          // hosts set PORT for us; 3000 locally

// --- Middleware (runs on every request, in order) ---
app.use(express.json());                        // lets us read JSON bodies (the form data)
app.use(express.static(path.join(__dirname, "public"))); // serve index.html, css, js, images

/* ------------------------------------------------------------
   THE CONTACT ROUTE
   The browser's fetch("/api/contact") lands here.
   ------------------------------------------------------------ */
app.post("/api/contact", async (req, res) => {
  // req.body is the data the visitor typed. Pull out each field.
  // "product" is included when the inquiry came from a product popup.
  const { name, email, company, message, product } = req.body || {};

  // 1) Basic validation. Never trust data from the internet.
  //    A general contact needs a message; a product inquiry needs a product.
  if (!name || !email || (!message && !product)) {
    return res.status(400).json({ error: "Name, email and a message are required." });
  }
  // A very light email sanity check (not perfect, just catches typos).
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  // 2) Always log it so you can see submissions in the server logs.
  console.log("New enquiry:", { name, email, company, product, message });

  // 3) Try to email it to your sales inbox — but only if SMTP is configured.
  //    Until you add the SMTP_* values (see .env.example), this step is skipped
  //    and the form still "works" (message is logged and success is returned).
  try {
    if (process.env.SMTP_HOST) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465, // true for port 465
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });

      // (a) Notify your sales inbox — this is the lead you wanted to capture.
      await transporter.sendMail({
        from: `"Air 8 Website" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_TO || "sales@air8industries.com",
        replyTo: email, // so you can reply straight to the visitor
        subject: `New enquiry from ${name}${product ? " — " + product : ""}`,
        text:
          `Name: ${name}\n` +
          `Email: ${email}\n` +
          `Company: ${company || "-"}\n` +
          `Product: ${product || "-"}\n\n` +
          `Message:\n${message || "(catalogue request)"}`,
      });

      // (b) Auto-reply to the visitor so they know it went through.
      await transporter.sendMail({
        from: `"Air 8 Industries" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Thanks for your enquiry — Air 8 Industries",
        text:
          `Hi ${name},\n\n` +
          `Thanks for reaching out to Air 8 Industries` +
          (product ? ` about ${product}` : "") +
          `. We've received your message and our team will get back to you shortly` +
          (product ? `, including the catalogue you requested.` : `.`) +
          `\n\n— Air 8 Industries Inc.\nsales@air8industries.com`,
      });
    }

    // 4) Tell the browser it worked.
    return res.json({ ok: true });
  } catch (err) {
    console.error("Email send failed:", err.message);
    // The message was still logged above, so we don't lose it — but report failure.
    return res.status(500).json({ error: "Could not send message." });
  }
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
