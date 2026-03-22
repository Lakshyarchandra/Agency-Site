// server/lib/db.js
const mysql = require('mysql2/promise');

let pool;

function getDB() {
  if (!pool) {
    pool = mysql.createPool({
      host:     process.env.DB_HOST || 'localhost',
      port:     parseInt(process.env.DB_PORT) || 3306,
      user:     process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'CodePromix_site',
      waitForConnections: true,
      connectionLimit: 10,
    });
  }
  return pool;
}

module.exports = { getDB };
