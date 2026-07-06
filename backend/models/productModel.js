const pool = require('../config/db');

async function getAllProducts() {
  const [rows] = await pool.query('SELECT * FROM products ORDER BY id ASC');
  return rows;
}

async function getProductBySlug(slug) {
  const [rows] = await pool.query('SELECT * FROM products WHERE slug = ?', [slug]);
  return rows[0];
}

module.exports = { getAllProducts, getProductBySlug };
