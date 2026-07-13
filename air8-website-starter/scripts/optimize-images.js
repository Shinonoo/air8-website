/* ============================================================
   Air 8 Industries — scripts/optimize-images.js
   ------------------------------------------------------------
   One-off (but safe to re-run) image optimizer:

     1. Walks public/images for .png / .jpg / .jpeg files
     2. Converts each to WebP, resized to max 900px on the long
        edge (catalog cards and the product modal never show
        images larger than that)
     3. Deletes the original ONLY if the WebP is smaller
     4. Updates every reference:
          - DB: products.primary_image_url, product_images.image_url
          - Legacy seed: public/products-data.js
        (HTML references are updated by hand — only the logos.)

   The original PNGs stay recoverable from git history, so no
   separate backup folder is needed.

   Usage:  node scripts/optimize-images.js
   ============================================================ */

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const pool = require("../db");

const IMAGES_DIR = path.join(__dirname, "..", "public", "images");
const MAX_EDGE = 900;   // px — plenty for a catalog card / modal
const QUALITY = 82;     // WebP quality — visually lossless for product shots

// Small files (icons, tiny logos) aren't worth touching.
const MIN_BYTES = 15 * 1024;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

async function main() {
  const files = walk(IMAGES_DIR).filter((f) => /\.(png|jpe?g)$/i.test(f));
  const renames = []; // [oldRelPath, newRelPath] using forward slashes relative to /public

  let beforeTotal = 0;
  let afterTotal = 0;
  let skipped = 0;

  for (const file of files) {
    const stat = fs.statSync(file);
    if (stat.size < MIN_BYTES) {
      skipped++;
      continue;
    }

    const out = file.replace(/\.(png|jpe?g)$/i, ".webp");
    await sharp(file)
      .resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out);

    const outSize = fs.statSync(out).size;
    if (outSize >= stat.size) {
      // WebP didn't help (rare) — keep the original.
      fs.unlinkSync(out);
      skipped++;
      continue;
    }

    fs.unlinkSync(file);
    beforeTotal += stat.size;
    afterTotal += outSize;

    const rel = (p) => path.relative(path.join(__dirname, "..", "public"), p).split(path.sep).join("/");
    renames.push([rel(file), rel(out)]);
  }

  console.log(`Converted ${renames.length} images, skipped ${skipped} (small or WebP not smaller).`);
  console.log(`Size: ${(beforeTotal / 1024 / 1024).toFixed(1)}MB -> ${(afterTotal / 1024 / 1024).toFixed(1)}MB`);

  // ---- Update database references ----
  let dbUpdates = 0;
  for (const [oldRel, newRel] of renames) {
    const [r1] = await pool.query(
      "UPDATE products SET primary_image_url = ? WHERE primary_image_url = ?",
      [newRel, oldRel]
    );
    const [r2] = await pool.query(
      "UPDATE product_images SET image_url = ? WHERE image_url = ?",
      [newRel, oldRel]
    );
    dbUpdates += r1.affectedRows + r2.affectedRows;
  }
  console.log(`Database: ${dbUpdates} image path(s) updated.`);

  // ---- Update the legacy seed file so re-running migrate-products.js
  //      doesn't put the old .png paths back into the database ----
  const seedPath = path.join(__dirname, "..", "public", "products-data.js");
  let seed = fs.readFileSync(seedPath, "utf8");
  let seedHits = 0;
  for (const [oldRel, newRel] of renames) {
    if (seed.includes(oldRel)) {
      seed = seed.split(oldRel).join(newRel);
      seedHits++;
    }
  }
  fs.writeFileSync(seedPath, seed);
  console.log(`products-data.js: ${seedHits} path(s) updated.`);

  await pool.end();
}

main().catch((err) => {
  console.error("Image optimization failed:", err);
  process.exit(1);
});
