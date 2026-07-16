/* ============================================================
   Air 8 Industries — utils/mailer.js
   ------------------------------------------------------------
   Sends the contact-form notification emails.

   WHY THIS ISN'T JUST NODEMAILER:
   Railway (like most cloud hosts) blocks outbound SMTP to stop
   its platform being used for spam. Every SMTP port we tried
   timed out — 465 to our own cPanel mail server, and 587 to
   Brevo's relay. The connection is dropped, not refused, so it
   looks like a hang rather than an error. No SMTP credential
   can fix that; the port is simply closed.

   So the default path here is Brevo's HTTP API, which is an
   ordinary HTTPS POST on port 443 — the same port the website
   itself is served on, and one no host blocks.

   SMTP is kept as a fallback for running locally or on a host
   that does allow it.
   ============================================================ */

const nodemailer = require("nodemailer");

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

/**
 * Send one email through Brevo's HTTP API.
 * `from` must be an address on a domain authenticated in Brevo,
 * otherwise Brevo rejects the request with 400.
 */
async function sendViaBrevoApi({ apiKey, fromName, from, to, replyTo, subject, text }) {
  const payload = {
    sender: { email: from, name: fromName },
    to: [{ email: to }],
    subject,
    textContent: text,
  };
  if (replyTo) payload.replyTo = { email: replyTo };

  const res = await fetch(BREVO_ENDPOINT, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(payload),
    // Nobody is waiting on this (we reply to the visitor first), but an
    // unbounded request would still pin a socket open indefinitely.
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    // Brevo puts the actual reason in the body ("sender not authenticated",
    // "invalid api key"...). Surface it — a bare status code is useless when
    // this fails at 2am and all you have is a log line.
    const body = await res.text().catch(() => "");
    throw new Error(`Brevo API ${res.status}: ${body.slice(0, 300)}`);
  }
  return res.json().catch(() => ({}));
}

/** Send one email over SMTP (local dev, or a host that permits it). */
async function sendViaSmtp({ fromName, from, to, replyTo, subject, text }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
  return transporter.sendMail({
    from: `"${fromName}" <${from}>`,
    to,
    replyTo,
    subject,
    text,
  });
}

/**
 * Send an email by whichever transport is configured.
 * Prefers the Brevo API; falls back to SMTP; returns false if neither
 * is set up (so the caller can carry on — mail is never the system of
 * record, the database is).
 */
async function sendMail(msg) {
  const from = process.env.MAIL_FROM || process.env.SMTP_USER;

  if (process.env.BREVO_API_KEY) {
    await sendViaBrevoApi({ apiKey: process.env.BREVO_API_KEY, from, ...msg });
    return true;
  }
  if (process.env.SMTP_HOST) {
    await sendViaSmtp({ from, ...msg });
    return true;
  }
  return false;
}

module.exports = { sendMail };
