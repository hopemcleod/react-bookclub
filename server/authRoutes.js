// authRoutes.js
const express = require('express');
const router = express.Router();
const mySql = require('mysql2/promise'); // Use the Promise-based interface

// Create a connection pool
const pool = mySql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'p@ssw0rd',
  database: 'automation',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

router.post('/check-credentials', async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({ message: 'Error! Email and password are required.' });
  }

  const sql = 'SELECT * FROM user WHERE email = ?';

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(sql, [email]);
    connection.release();

    if (result.length === 0) {
      return response.status(404).json({ message: 'User not found.' });
    }

    // Add your password comparison logic here
    const user = result[0];
    // ...

    response.status(200).json({ message: 'Authentication successful.', user });
  } catch (err) {
    console.error(err);
    response.status(500).json({ message: 'Error checking credentials.' });
  }
});

module.exports = router;