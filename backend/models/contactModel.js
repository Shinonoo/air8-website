const pool = require('../config/db');

async function createInquiry({ name, email, phone, message, product }) {
  const [result] = await pool.query(
    `INSERT INTO inquiries (name, email, phone, message, product, created_at)
     VALUES (?, ?, ?, ?, ?, NOW())`,
    [name, email, phone, message, product]
  );
  return result.insertId;
}

async function getAllInquiries() {
  const [rows] = await pool.query('SELECT * FROM inquiries ORDER BY created_at DESC');
  return rows;
}

module.exports = { createInquiry, getAllInquiries };
