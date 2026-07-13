/* ============================================================
   Air 8 Industries — nav.js  (shared by every page)
   ------------------------------------------------------------
   1. Mobile menu open/close
   2. Footer year
   3. Highlight the nav link for the page you're on
   4. Gentle fade-out when moving to another page (smoother feel)
   The homepage's main.js adds scroll-spy + the contact form on top.
   ============================================================ */

const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

/* 1. Mobile menu */
if (navToggle && navMenu) {
  navToggle.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });
  navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* 2. Footer year */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* 3. Active link for the current PAGE (e.g. highlight "Products" on products.html) */
const currentPage = location.pathname.split("/").pop() || "index.html";
if (navMenu) {
  navMenu.querySelectorAll("a").forEach(function (link) {
    const href = link.getAttribute("href") || "";
    const linkPage = href.split("#")[0].split("/").pop(); // strip #hash and folder
    if (linkPage && linkPage === currentPage) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });
}

/* 4. Fade the page out before navigating to another .html page.
      Only for real page changes (not #anchors, new tabs, or downloads). */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReducedMotion) {
  document.querySelectorAll('a[href$=".html"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      // Ignore if the user is opening in a new tab / with modifier keys.
      if (e.metaKey || e.ctrlKey || e.shiftKey || link.target === "_blank") return;
      e.preventDefault();
      const url = link.href;
      document.body.classList.add("is-leaving");
      setTimeout(function () { window.location.href = url; }, 180);
    });
  });
}
