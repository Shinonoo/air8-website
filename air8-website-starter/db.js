/* ============================================================
   Air 8 Industries — db.js
   ------------------------------------------------------------
   One shared connection pool to the `air8_db` MariaDB/MySQL
   database (see air8_db.sql for the schema). Every route that
   needs the database requires this file and calls pool.query(...).
   ============================================================ */

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "air8_db",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
