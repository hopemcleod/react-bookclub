const express = require('express')
const router = express.Router()
const mySql = require('mysql2/promise') // Use the Promise-based interface

// Create a connection pool
const pool = mySql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'p@ssw0rd',
  database: 'automation',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

router.get('/books', async (request, response) => {
  console.log('GET Books routes found!')

  const sql = 'SELECT * FROM book'

  try {
    const connection = await pool.getConnection()
    const [result] = await connection.query(sql)
    connection.release()

    if (result.length === 0) {
      return response.status(404).json({ message: 'No books found.' })
    }

    if (response.statusCode === 200) {
      return response.status(200).json({result})
    }
  } catch (err) {
    console.error(err);
    return response.status(500).json({ message: 'Error checking books.' });
  }

  return response.status(500).json({ message: 'Error getting meetings.' });

});

module.exports = router;