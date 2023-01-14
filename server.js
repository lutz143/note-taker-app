// require express and path modules
const express = require('express');
const path = require('path');
const api = require('./routes/db.js');

// create port for local listening while in development
const PORT = 3001;

const app = express();

// create express middleware to prepare body, query, and custom route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/notes', api);

// create routes in the public folder
app.use(express.static('public'));

// get index.html or the route for the homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET request for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Wildcard route to direct users to a 404 page
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/pages/404.html'))
// );

// listen to const PORT
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
