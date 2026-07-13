/* ============================================================
   Public site-content API (read-only).
   Returns ONLY the blocks the admin has actually changed — i.e.
   where value differs from the seeded default. Un-edited blocks
   are left to the copy hard-coded in the HTML, so the front end
   keeps its original formatting (bold brand names etc.) and the
   page still reads correctly with JS disabled.
   ============================================================ */

const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/content", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT content_key, value
       FROM site_content
       WHERE value IS NOT NULL
         AND value <> ''
         AND NOT (value <=> default_value)`
    );
    const map = {};
    for (const row of rows) map[row.content_key] = row.value;
    // no-cache = the browser may keep a copy but must revalidate every load,
    // so an admin's edit shows on the very next page view instead of being
    // hidden behind a stale cache. The payload is tiny (only edited blocks).
    res.set("Cache-Control", "no-cache");
    res.json(map);
  } catch (err) {
    console.error("GET /api/content failed:", err.message);
    // Never break the page over content: fall back to the HTML defaults.
    res.json({});
  }
});

module.exports = router;
