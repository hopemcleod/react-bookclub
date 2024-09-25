const bodyParser = require('body-parser') // need this library to parse the request body.
const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const authRoutes = require('./authRoutes')
const meetingRoutes = require('./meetingRoutes')
const booksRoutes = require('./bookRoutes')
const app = express()

// const bcrypt = require('bcrypt');
// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

dotenv.config()
const port = process.env.HTTP_PORT

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:8080']
  // origin: ['http://localhost:5173', 'https://ui-auto-training-app.ebms.co']
}))

app.get('/', (req, res) => {
  console.log('Headers', req.headers)
  res.send('Check the console for Referrer headers.')
})

app.use('/auth', authRoutes)
app.use('/meetings', meetingRoutes)
app.use('/books', booksRoutes)

app.use(express.json())
// app.use(express.text());

app.listen(`${port}`, () => console.log(`Server is listening on ${port}.`))

// app.get('/', (request, response) => {
//   return response.json('Server is ready for a request.');
// });

/*
app.get('/books', (request, response) => {
  const sql = `SELECT * FROM user WHERE email = ?`;
  db.query(sql, (error, data) => {
    if (error)
      return response.json(error);
    return response.json(data);
  });
});

app.post('/books', (request, response) => {
  const data = request.body;

  if (!data || data.length === 0) {
    response.status(400).json({ message: 'Error! No data provided.' });
    return;
  }

  const sql = 'INSERT INTO books (author, genre, progress, title) VALUES ?';
  const values = data.map(book => [book.author, book.genre, book.progress, book.title]);

  try {
    const placeholders = data.map(() => '(?, ?, ?, ?)').join(', ');
    const flattenedValues = [].concat(...values); // Flatten the nested arrays

    const query = sql.replace('?', placeholders);

    db.execute(query, flattenedValues, (error, result) => {
      if (error || result == null) {
        console.error(error);
        response.status(500).json({ message: 'Error! No data inserted.' });
      } else {
        response.json({ message: 'Success! Data inserted.', insertedRows: result.affectedRows });
      }
    });
  } catch (err) {
    console.error(err);
    response.status(500).json({ message: 'Error saving data.' });
  }
});

// app.post('/books', (request, response) => {
//     const data = (request.body === undefined ? null : request.body);
//     const sql = 'INSERT INTO books (author, genre, progress, title) VALUES ?'
//     const values = data.map(book => [book.author, book.genre, book.progress, book.title]);
//     try {
//             db.execute(sql, [values], (error, data) => {             
//             if (error || (data === null))
//             {
//                 response.json({ message: 'Success! Data inserted.', insertedRows: result.affectedRows });
//                 console.log();
//             }
//         })
//     }
//     catch (err) {
//         console.log(err);
//         response.status(500).send('Error saving data');
//     }
// });

////////////////////////////// users table //////////////////////////////
app.post('/users', (request, response) => {
  const data = request.body;

  if (!data || data.length === 0) {
    response.status(400).json({ message: 'Error! No data provided.' });
    return;
  }

  const sql = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)';
  // const values = data.map(user => [user.name, user.email, user.password]);

  try {
    // const placeholders = data.map(() => '(?, ?, ?)').join(', ');
    // const flattenedValues = [].concat(...values); // Flatten the nested arrays

    // const query = sql.replace('?', placeholders);

    db.execute(sql, [data.name, data.email, data.password], (error, result) => {
      if (error || result == null) {
        console.error(error);
        response.status(500).json({ message: 'Error! No data inserted.' });
      } else {
        response.json({ message: 'Success! Data inserted.', insertedRows: result.affectedRows });
      }
    });
  } catch (err) {
    console.error(err);
    response.status(500).json({ message: 'Error saving data.' });
  }
});
*/