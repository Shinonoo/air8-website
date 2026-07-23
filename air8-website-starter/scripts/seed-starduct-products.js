/* ============================================================
   Air 8 Industries — scripts/seed-starduct-products.js
   ------------------------------------------------------------
   Loads the real Starduct range (scripts/starduct-products.js)
   into the products table.

   Runs at server startup for the same reason the brochure repair
   does: the app is the only thing holding credentials for the
   production database.

   SAFETY:
   - Upserts by slug, so re-running never duplicates a product.
   - Child rows (categories, images, files, specs) are rebuilt from
     scratch per product, which keeps the result identical no
     matter how many times it runs.
   - Purely additive. It does not touch the seven original
     placeholder rows, and it deletes nothing outside the products
     it owns — those placeholders are left for a human to retire
     from the admin panel once the new range has been eyeballed.
   ============================================================ */

const pool = require("./../db");
const slugify = require("./../utils/slugify");
const { PRODUCTS, CATALOGUE } = require("./starduct-products");

const BRAND = "Starduct";

// Placed after the existing catalogue so the new products append
// rather than shuffling Elta and Abie Tiger around the grid.
const SORT_BASE = 200;

async function upsertByName(table, name) {
  const [result] = await pool.query(
    `INSERT INTO ${table} (name, slug) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)`,
    [name, slugify(name)]
  );
  return result.insertId;
}

async function seedStarductProducts() {
  const brandId = await upsertByName("brands", BRAND);
  const categoryIds = new Map();
  let created = 0;
  let updated = 0;

  for (const [index, p] of PRODUCTS.entries()) {
    if (!categoryIds.has(p.category)) {
      categoryIds.set(p.category, await upsertByName("categories", p.category));
    }
    const categoryId = categoryIds.get(p.category);

    const slug = slugify(`${BRAND}-${p.name}-${p.code}`);
    const image = `images/starduct/${p.image}`;
    const brochure = `brochures/starduct/${CATALOGUE[p.category]}`;

    const [existing] = await pool.query("SELECT id FROM products WHERE slug = ?", [slug]);
    const isNew = existing.length === 0;

    const [result] = await pool.query(
      `INSERT INTO products
         (brand_id, category_id, name, slug, code, short_description,
          primary_image_url, brochure_url, sort_order)
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
        categoryId,
        p.name,
        slug,
        p.code,
        p.blurb,
        image,
        brochure,
        SORT_BASE + index,
      ]
    );
    const productId = result.insertId;
    isNew ? created++ : updated++;

    await pool.query("DELETE FROM product_categories WHERE product_id = ?", [productId]);
    await pool.query(
      "INSERT IGNORE INTO product_categories (product_id, category_id) VALUES (?, ?)",
      [productId, categoryId]
    );

    await pool.query("DELETE FROM product_images WHERE product_id = ?", [productId]);
    await pool.query(
      "INSERT INTO product_images (product_id, image_url, alt_text, is_primary) VALUES (?, ?, ?, 1)",
      [productId, image, p.name]
    );

    await pool.query("DELETE FROM product_files WHERE product_id = ?", [productId]);
    await pool.query(
      "INSERT INTO product_files (product_id, file_type, file_url, title) VALUES (?, 'brochure', ?, ?)",
      [productId, brochure, `${p.name} brochure`]
    );

    await pool.query("DELETE FROM product_specs WHERE product_id = ?", [productId]);
    for (const [i, spec] of (p.specs || []).entries()) {
      await pool.query(
        "INSERT INTO product_specs (product_id, spec_label, spec_value, sort_order) VALUES (?, ?, ?, ?)",
        [productId, spec.label, spec.value, i]
      );
    }
  }

  return { created, updated };
}

module.exports = { seedStarductProducts };

if (require.main === module) {
  require("dotenv").config();
  seedStarductProducts()
    .then(({ created, updated }) => {
      console.log(`Starduct: ${created} product(s) created, ${updated} updated.`);
      return pool.end();
    })
    .catch((err) => {
      console.error("Starduct seed failed:", err.message);
      process.exit(1);
    });
}
