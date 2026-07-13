/* ============================================================
   Air 8 Industries — scripts/migrate-products.js
   ------------------------------------------------------------
   One-time (but safe to re-run) migration that loads every
   product out of public/products-data.js into the `air8_db`
   database described by air8_db.sql.

   Usage:
     1. Import air8_db.sql into MariaDB/MySQL (e.g. via phpMyAdmin).
     2. Copy .env.example to .env and fill in DB_* values.
     3. npm install
     4. npm run migrate

   Re-running is safe: brands/categories are upserted by name, and
   products are upserted by slug, so it won't create duplicates.
   ============================================================ */

require("dotenv").config();
const path = require("path");
const pool = require("../db");
const slugify = require("../utils/slugify");
const PRODUCTS = require(path.join(__dirname, "..", "public", "products-data.js"));

// "category" is either a string or an array of strings — always work with a list.
function catList(p) {
  return Array.isArray(p.category) ? p.category : [p.category];
}

// INSERT ... ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id) is a MySQL trick:
// LAST_INSERT_ID() returns the new id on insert, or the existing row's id
// on conflict — so this one query both upserts and tells us the id.
async function upsertByName(table, name) {
  const slug = slugify(name);
  const [result] = await pool.query(
    `INSERT INTO ${table} (name, slug) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)`,
    [name, slug]
  );
  return result.insertId;
}

async function main() {
  console.log(`Migrating ${PRODUCTS.length} products into ${process.env.DB_NAME || "air8_db"}...`);

  const brandIds = new Map();
  const categoryIds = new Map();
  const usedSlugs = new Set();
  let created = 0;
  let updated = 0;

  for (const [index, p] of PRODUCTS.entries()) {
    if (!brandIds.has(p.brand)) {
      brandIds.set(p.brand, await upsertByName("brands", p.brand));
    }
    const brandId = brandIds.get(p.brand);

    const categories = catList(p);
    const thisProductCategoryIds = [];
    for (const catName of categories) {
      if (!categoryIds.has(catName)) {
        categoryIds.set(catName, await upsertByName("categories", catName));
      }
      thisProductCategoryIds.push(categoryIds.get(catName));
    }
    const primaryCategoryId = thisProductCategoryIds[0];

    // Slugs must be unique across all products; dedupe collisions deterministically.
    let baseSlug = slugify(`${p.brand}-${p.name}-${p.code || ""}`);
    let slug = baseSlug;
    let n = 2;
    while (usedSlugs.has(slug)) {
      slug = `${baseSlug}-${n++}`;
    }
    usedSlugs.add(slug);

    const [existingRows] = await pool.query("SELECT id FROM products WHERE slug = ?", [slug]);
    const isNew = existingRows.length === 0;

    const [result] = await pool.query(
      `INSERT INTO products
         (brand_id, category_id, name, slug, code, short_description, primary_image_url, brochure_url, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         brand_id = VALUES(brand_id),
         category_id = VALUES(category_id),
         name = VALUES(name),
         code = VALUES(code),
         short_description = VALUES(short_description),
         primary_image_url = VALUES(primary_image_url),
         brochure_url = VALUES(brochure_url),
         sort_order = VALUES(sort_order),
         id = LAST_INSERT_ID(id)`,
      [
        brandId,
        primaryCategoryId,
        p.name,
        slug,
        p.code || null,
        p.blurb || null,
        p.image || null,
        p.brochure || null,
        index,
      ]
    );
    const productId = result.insertId;
    isNew ? created++ : updated++;

    // Re-derive the category links, image and brochure rows from scratch
    // each run so the migration stays idempotent.
    await pool.query("DELETE FROM product_categories WHERE product_id = ?", [productId]);
    for (const categoryId of thisProductCategoryIds) {
      await pool.query(
        "INSERT IGNORE INTO product_categories (product_id, category_id) VALUES (?, ?)",
        [productId, categoryId]
      );
    }

    await pool.query("DELETE FROM product_images WHERE product_id = ?", [productId]);
    if (p.image) {
      await pool.query(
        "INSERT INTO product_images (product_id, image_url, alt_text, is_primary) VALUES (?, ?, ?, 1)",
        [productId, p.image, p.name]
      );
    }

    await pool.query("DELETE FROM product_files WHERE product_id = ?", [productId]);
    if (p.brochure) {
      await pool.query(
        "INSERT INTO product_files (product_id, file_type, file_url, title) VALUES (?, 'brochure', ?, ?)",
        [productId, p.brochure, `${p.name} brochure`]
      );
    }

    await pool.query("DELETE FROM product_specs WHERE product_id = ?", [productId]);
    if (Array.isArray(p.specs)) {
      for (const [specIndex, spec] of p.specs.entries()) {
        await pool.query(
          "INSERT INTO product_specs (product_id, spec_label, spec_value, sort_order) VALUES (?, ?, ?, ?)",
          [productId, spec.label, spec.value, specIndex]
        );
      }
    }
  }

  console.log(`Done. ${brandIds.size} brands, ${categoryIds.size} categories, ${created} products created, ${updated} products updated.`);
  await pool.end();
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
