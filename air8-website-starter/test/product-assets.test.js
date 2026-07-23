/* ============================================================
   Air 8 Industries — test/product-assets.test.js
   ------------------------------------------------------------
   Guards the id -> file maps in scripts/fix-brochure-paths.js.

   WHY: those maps are the only thing standing between a product
   page and a dead "Download brochure" link. A single typo — a
   plural, a .png that is really a .webp — writes a path into the
   production database that points at nothing, and nobody finds
   out until a customer clicks it. The whole catalogue was broken
   exactly this way once: thirteen fans pointing at an invented
   "elta-cased-axial.pdf" that had never existed in the repo.

   Run with:  npm test
   ============================================================ */

const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

const pool = require("../db");
const {
  BROCHURES,
  IMAGES,
  IMAGES_ABIE,
} = require("../scripts/fix-brochure-paths");

const PUBLIC_DIR = path.join(__dirname, "..", "public");

// Each map is checked against the folder its paths are built from, so a
// file that exists but sits in the wrong brand folder still fails.
const MAPS = [
  ["BROCHURES", BROCHURES, "brochures/elta_fans"],
  ["IMAGES", IMAGES, "images/elta_fans"],
  ["IMAGES_ABIE", IMAGES_ABIE, "images/abie_tiger"],
];

for (const [label, map, dir] of MAPS) {
  test(`${label}: every mapped file exists in public/${dir}`, () => {
    const missing = Object.entries(map)
      .filter(([, file]) => !fs.existsSync(path.join(PUBLIC_DIR, dir, file)))
      .map(([id, file]) => `product ${id} -> ${dir}/${file}`);

    assert.deepStrictEqual(
      missing,
      [],
      `${missing.length} mapped file(s) are not on disk:\n  ${missing.join("\n  ")}`
    );
  });

  test(`${label}: product ids are positive integers`, () => {
    const bad = Object.keys(map).filter((id) => !/^[1-9]\d*$/.test(id));
    assert.deepStrictEqual(bad, [], `not usable as a product id: ${bad}`);
  });
}

// A product can only carry one photo, so the same id appearing in both
// image maps would mean two writes racing to set primary_image_url — the
// winner decided by map order rather than by intent.
test("IMAGES and IMAGES_ABIE do not both claim the same product", () => {
  const overlap = Object.keys(IMAGES).filter((id) => id in IMAGES_ABIE);
  assert.deepStrictEqual(overlap, [], `ids in both image maps: ${overlap}`);
});

// URLs are built by string concatenation, so a space or a "(1)" in a
// filename silently produces a link the browser cannot follow. We renamed
// "QB (1).pdf" for exactly this reason.
test("filenames are URL-safe", () => {
  const unsafe = MAPS.flatMap(([label, map]) =>
    Object.entries(map)
      .filter(([, file]) => !/^[A-Za-z0-9._-]+$/.test(file))
      .map(([id, file]) => `${label} ${id} -> "${file}"`)
  );
  assert.deepStrictEqual(unsafe, [], `unsafe filename(s): ${unsafe.join(", ")}`);
});

// The pool is created on require and would otherwise hold the test
// process open; it never connects here because we run no queries.
test.after(() => pool.end());
