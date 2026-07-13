/* ============================================================
   Public products API — read-only, published products only.
   Shapes rows to match the exact fields products-data.js used
   to provide (brand, category, name, code, image, blurb,
   brochure, specs), so public/products.js needed almost no
   changes to switch from the static file to this API.
   ============================================================ */

const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/products", async (req, res) => {
  try {
    const [products] = await pool.query(
      `SELECT p.id, p.slug, p.name, p.code, p.short_description, p.primary_image_url, p.brochure_url,
              b.name AS brand
       FROM products p
       JOIN brands b ON b.id = p.brand_id
       WHERE p.is_published = 1
       ORDER BY p.sort_order, p.name`
    );
    if (products.length === 0) return res.json([]);

    const ids = products.map((p) => p.id);
    const [categoryRows] = await pool.query(
      `SELECT pc.product_id, c.name AS category
       FROM product_categories pc
       JOIN categories c ON c.id = pc.category_id
       WHERE pc.product_id IN (?)`,
      [ids]
    );
    const [specRows] = await pool.query(
      `SELECT product_id, spec_label AS label, spec_value AS value
       FROM product_specs
       WHERE product_id IN (?)
       ORDER BY sort_order`,
      [ids]
    );

    const categoriesByProduct = new Map();
    for (const row of categoryRows) {
      if (!categoriesByProduct.has(row.product_id)) categoriesByProduct.set(row.product_id, []);
      categoriesByProduct.get(row.product_id).push(row.category);
    }
    const specsByProduct = new Map();
    for (const row of specRows) {
      if (!specsByProduct.has(row.product_id)) specsByProduct.set(row.product_id, []);
      specsByProduct.get(row.product_id).push({ label: row.label, value: row.value });
    }

    res.json(
      products.map((p) => ({
        id: p.id,
        slug: p.slug,
        brand: p.brand,
        category: categoriesByProduct.get(p.id) || [],
        name: p.name,
        code: p.code || "",
        image: p.primary_image_url || "",
        blurb: p.short_description || "",
        brochure: p.brochure_url || "",
        specs: specsByProduct.get(p.id) || [],
      }))
    );
  } catch (err) {
    console.error("GET /api/products failed:", err.message);
    res.status(500).json({ error: "Could not load products." });
  }
});

router.get("/brands", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT name FROM brands ORDER BY name");
    res.json(rows.map((r) => r.name));
  } catch (err) {
    console.error("GET /api/brands failed:", err.message);
    res.status(500).json({ error: "Could not load brands." });
  }
});

router.get("/categories", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT name FROM categories ORDER BY name");
    res.json(rows.map((r) => r.name));
  } catch (err) {
    console.error("GET /api/categories failed:", err.message);
    res.status(500).json({ error: "Could not load categories." });
  }
});

module.exports = router;
