/* ============================================================
   Admin API — backs public/admin.html.
   One shared password (ADMIN_PASSWORD in .env), no user table.
   Everything past the auth routes requires an active session.
   ============================================================ */

const express = require("express");
const router = express.Router();
const pool = require("../db");
const slugify = require("../utils/slugify");
const requireAdmin = require("../middleware/requireAdmin");

// ---- Auth ----
router.post("/login", (req, res) => {
  const { password } = req.body || {};
  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ error: "Admin panel is not configured. Set ADMIN_PASSWORD in .env." });
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Incorrect password." });
  }
  req.session.isAdmin = true;
  res.json({ ok: true });
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

router.get("/session", (req, res) => {
  res.json({ loggedIn: !!(req.session && req.session.isAdmin) });
});

// ---- Everything below requires a logged-in admin ----
router.use(requireAdmin);

// ---- Brands & categories (for populating the product form) ----
router.get("/brands", async (req, res) => {
  const [rows] = await pool.query("SELECT id, name FROM brands ORDER BY name");
  res.json(rows);
});

router.post("/brands", async (req, res) => {
  const { name } = req.body || {};
  if (!name || !name.trim()) return res.status(400).json({ error: "Name is required." });
  const [result] = await pool.query(
    "INSERT INTO brands (name, slug) VALUES (?, ?) ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)",
    [name.trim(), slugify(name)]
  );
  res.json({ id: result.insertId, name: name.trim() });
});

router.get("/categories", async (req, res) => {
  const [rows] = await pool.query("SELECT id, name FROM categories ORDER BY name");
  res.json(rows);
});

router.post("/categories", async (req, res) => {
  const { name } = req.body || {};
  if (!name || !name.trim()) return res.status(400).json({ error: "Name is required." });
  const [result] = await pool.query(
    "INSERT INTO categories (name, slug) VALUES (?, ?) ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)",
    [name.trim(), slugify(name)]
  );
  res.json({ id: result.insertId, name: name.trim() });
});

// ---- Products (full CRUD, including unpublished ones) ----
router.get("/products", async (req, res) => {
  try {
    const [products] = await pool.query(
      `SELECT p.*, b.name AS brand_name
       FROM products p
       JOIN brands b ON b.id = p.brand_id
       ORDER BY p.sort_order, p.name`
    );
    if (products.length === 0) return res.json([]);

    const ids = products.map((p) => p.id);
    const [categoryRows] = await pool.query(
      `SELECT pc.product_id, c.id AS category_id, c.name AS category_name
       FROM product_categories pc
       JOIN categories c ON c.id = pc.category_id
       WHERE pc.product_id IN (?)`,
      [ids]
    );
    const [specRows] = await pool.query(
      "SELECT product_id, spec_label AS label, spec_value AS value FROM product_specs WHERE product_id IN (?) ORDER BY sort_order",
      [ids]
    );

    const categoriesByProduct = new Map();
    for (const row of categoryRows) {
      if (!categoriesByProduct.has(row.product_id)) categoriesByProduct.set(row.product_id, []);
      categoriesByProduct.get(row.product_id).push({ id: row.category_id, name: row.category_name });
    }
    const specsByProduct = new Map();
    for (const row of specRows) {
      if (!specsByProduct.has(row.product_id)) specsByProduct.set(row.product_id, []);
      specsByProduct.get(row.product_id).push({ label: row.label, value: row.value });
    }

    res.json(
      products.map((p) => ({
        ...p,
        categories: categoriesByProduct.get(p.id) || [],
        specs: specsByProduct.get(p.id) || [],
      }))
    );
  } catch (err) {
    console.error("GET /api/admin/products failed:", err.message);
    res.status(500).json({ error: "Could not load products." });
  }
});

async function saveProduct(req, res, existingId) {
  const {
    brand_id,
    category_ids,
    name,
    code,
    short_description,
    primary_image_url,
    brochure_url,
    is_featured,
    is_published,
    specs,
  } = req.body || {};

  if (!brand_id || !name || !Array.isArray(category_ids) || category_ids.length === 0) {
    return res.status(400).json({ error: "Brand, name and at least one category are required." });
  }

  try {
    const baseSlug = slugify(`${name}-${code || ""}`) || slugify(name);
    let slug = baseSlug;
    let productId = existingId;

    if (existingId) {
      await pool.query(
        `UPDATE products SET
           brand_id = ?, category_id = ?, name = ?, code = ?, short_description = ?,
           primary_image_url = ?, brochure_url = ?, is_featured = ?, is_published = ?
         WHERE id = ?`,
        [
          brand_id,
          category_ids[0],
          name,
          code || null,
          short_description || null,
          primary_image_url || null,
          brochure_url || null,
          is_featured ? 1 : 0,
          is_published === false ? 0 : 1,
          existingId,
        ]
      );
    } else {
      let n = 2;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const [rows] = await pool.query("SELECT id FROM products WHERE slug = ?", [slug]);
        if (rows.length === 0) break;
        slug = `${baseSlug}-${n++}`;
      }
      const [result] = await pool.query(
        `INSERT INTO products
           (brand_id, category_id, name, slug, code, short_description, primary_image_url, brochure_url, is_featured, is_published)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          brand_id,
          category_ids[0],
          name,
          slug,
          code || null,
          short_description || null,
          primary_image_url || null,
          brochure_url || null,
          is_featured ? 1 : 0,
          is_published === false ? 0 : 1,
        ]
      );
      productId = result.insertId;
    }

    await pool.query("DELETE FROM product_categories WHERE product_id = ?", [productId]);
    for (const catId of category_ids) {
      await pool.query(
        "INSERT IGNORE INTO product_categories (product_id, category_id) VALUES (?, ?)",
        [productId, catId]
      );
    }

    await pool.query("DELETE FROM product_specs WHERE product_id = ?", [productId]);
    if (Array.isArray(specs)) {
      for (const [i, s] of specs.entries()) {
        if (!s || !s.label || !s.value) continue;
        await pool.query(
          "INSERT INTO product_specs (product_id, spec_label, spec_value, sort_order) VALUES (?, ?, ?, ?)",
          [productId, s.label, s.value, i]
        );
      }
    }

    await pool.query("DELETE FROM product_images WHERE product_id = ?", [productId]);
    if (primary_image_url) {
      await pool.query(
        "INSERT INTO product_images (product_id, image_url, alt_text, is_primary) VALUES (?, ?, ?, 1)",
        [productId, primary_image_url, name]
      );
    }

    await pool.query("DELETE FROM product_files WHERE product_id = ?", [productId]);
    if (brochure_url) {
      await pool.query(
        "INSERT INTO product_files (product_id, file_type, file_url, title) VALUES (?, 'brochure', ?, ?)",
        [productId, brochure_url, `${name} brochure`]
      );
    }

    res.json({ ok: true, id: productId, slug });
  } catch (err) {
    console.error("Save product failed:", err.message);
    res.status(500).json({ error: "Could not save product." });
  }
}

router.post("/products", (req, res) => saveProduct(req, res, null));
router.put("/products/:id", (req, res) => saveProduct(req, res, Number(req.params.id)));

router.delete("/products/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM products WHERE id = ?", [req.params.id]);
    res.json({ ok: true });
  } catch (err) {
    console.error("Delete product failed:", err.message);
    res.status(500).json({ error: "Could not delete product." });
  }
});

// ---- Inquiries (contact form + product popup submissions) ----
router.get("/inquiries", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM inquiries ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    console.error("GET /api/admin/inquiries failed:", err.message);
    res.status(500).json({ error: "Could not load inquiries." });
  }
});

router.put("/inquiries/:id/read", async (req, res) => {
  await pool.query("UPDATE inquiries SET is_read = 1 WHERE id = ?", [req.params.id]);
  res.json({ ok: true });
});

module.exports = router;
