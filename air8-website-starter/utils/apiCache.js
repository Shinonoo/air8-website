/* ============================================================
   Tiny in-memory cache for read-heavy public API responses.
   ------------------------------------------------------------
   The product catalog only changes when an admin edits it, but
   every visitor hits GET /api/products — so we keep the built
   JSON in memory and skip the 3 database queries on repeat
   requests. Admin write routes call invalidate() so a change
   shows up on the very next request.

   TTL is a safety net (e.g. someone edits the DB directly in
   phpMyAdmin, bypassing the admin API): the cache never serves
   anything older than TTL even if invalidate() was never called.
   ============================================================ */

const TTL_MS = 5 * 60 * 1000; // 5 minutes

const store = new Map(); // key -> { data, expires }

function get(key) {
  const hit = store.get(key);
  if (!hit) return undefined;
  if (Date.now() > hit.expires) {
    store.delete(key);
    return undefined;
  }
  return hit.data;
}

function set(key, data) {
  store.set(key, { data, expires: Date.now() + TTL_MS });
}

function invalidate() {
  store.clear();
}

module.exports = { get, set, invalidate };
