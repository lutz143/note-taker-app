// require express and path modules
const express = require('express');
const path = require('path');

// create port for local listening while in development
const PORT = 3001;

const app = express();

// create express middleware to prepare body and query
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create routes in the public folder
app.use(express.static('public'));

// get index.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET request for notes
app.get('/api/notes', (req, res) => {
  console.info(`GET /api/notes`);
  res.status(200).json(notes);
});

// listen to const PORT
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
