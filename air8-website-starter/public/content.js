/* ============================================================
   Air 8 Industries — content.js  (shared, loads FIRST)
   ------------------------------------------------------------
   Fetches admin-edited text from GET /api/content and drops it
   into any element marked with data-content-key. The original
   copy stays in the HTML as the fallback, so:
     - un-edited blocks keep their formatting (bold etc.),
     - the page still reads correctly if this request fails or
       JavaScript is disabled.

   Text is applied with textContent (never innerHTML), so an
   edit can never inject markup — safe by construction.

   Exposes window.contentReady (a promise that resolves to the
   content map) so other scripts — notably the hero animation,
   which rebuilds its own headline — can wait for and read it.
   ============================================================ */

(function () {
  function applyContent(map) {
    document.querySelectorAll("[data-content-key]").forEach(function (el) {
      var key = el.getAttribute("data-content-key");
      var val = map[key];
      if (val === undefined || val === null || val === "") return;
      // Multi-line values render their line breaks (CSS white-space handles
      // the rest); textContent keeps everything safely plain-text.
      el.textContent = val;
    });
  }

  window.contentReady = fetch("/api/content")
    .then(function (res) { return res.ok ? res.json() : {}; })
    .catch(function () { return {}; })
    .then(function (map) {
      // The DOM may not be parsed yet if this resolves very fast.
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () { applyContent(map); });
      } else {
        applyContent(map);
      }
      return map;
    });
})();
