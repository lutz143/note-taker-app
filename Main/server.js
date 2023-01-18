// require express and path modules
const express = require('express');
const path = require('path');
const api = require('./routes/db.js');
let notes = require('./db/db.json');

// create port for local listening while in development
const PORT = process.env.PORT ?? 3001;

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

app.get('/api/notes/:id', (req, res) => {
  const requestedId = req.params.id;

  // Iterate through the terms name to check if it matches `req.params.term`
  if (requestedId) {
    for (let i = 0; i < notes.length; i++) {
      if (requestedId === notes[i].id) {
        return res.json(notes[i]);
      }
    }
  }
});

// wildcard route to direct users to main page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// listen to const PORT
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);