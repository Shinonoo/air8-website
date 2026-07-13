/* ============================================================
   Air 8 Industries — main.js  (homepage only)
   ------------------------------------------------------------
   The shared bits (mobile menu, footer year, page fade, active
   page link) now live in nav.js, which loads BEFORE this file.
   Here we keep the homepage-specific jobs:
     1. Reveal sections as you scroll
     2. Scroll-spy: highlight the nav link for the section in view
     3. Send the contact form without reloading
   ============================================================ */

/* ---- 1. SCROLL REVEAL -------------------------------------- */
const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target); // only animate once
    }
  });
}, { threshold: 0.15 });
revealItems.forEach(function (item) { revealObserver.observe(item); });


/* ---- 2. SCROLL-SPY (active section in the nav) ------------- */
// Watches each section with an id and lights up the matching nav link
// (e.g. when "About" is on screen, the About link gets underlined).
const spySections = document.querySelectorAll("main section[id]");
const hashLinks = document.querySelectorAll('.nav a[href^="#"]');

function setActiveSection(id) {
  hashLinks.forEach(function (link) {
    const isMatch = link.getAttribute("href") === "#" + id;
    link.classList.toggle("is-active", isMatch);
  });
}

const spyObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) setActiveSection(entry.target.id);
  });
}, { rootMargin: "-45% 0px -50% 0px", threshold: 0 }); // "active" when a section hits mid-screen

spySections.forEach(function (section) { spyObserver.observe(section); });


/* ---- 3. CONTACT FORM --------------------------------------- */
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    company: form.company.value.trim(),
    message: form.message.value.trim(),
  };

  if (!data.name || !data.email || !data.message) {
    showStatus("Please fill in your name, email and message.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";
  showStatus("", "");

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      form.reset();
      showStatus("Thanks! Your message has been sent. We'll be in touch soon.", "ok");
    } else {
      showStatus("Something went wrong. Please try again or email us directly.", "error");
    }
  } catch (err) {
    showStatus("Could not reach the server. Please try again in a moment.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send message";
  }
});

function showStatus(text, type) {
  statusEl.textContent = text;
  statusEl.className = "form__status";
  if (type === "ok") statusEl.classList.add("is-ok");
  if (type === "error") statusEl.classList.add("is-error");
}
