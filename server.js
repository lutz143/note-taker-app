// require express and path modules
const express = require('express');
const path = require('path');
const api = require('./routes/db.js');
let notes = require('./db/db.json');

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

// Wildcard route to direct users to a 404 page
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/index.html'))
// );

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

// app.delete('/api/notes/:id', (req, res) => {
//   // Log that a DELETE request was received
//   console.info(`${req.method} request received to delete a note!`);
//   // Destructuring assignment for the items in req.body
//   const { id } = req.params;

//   const deleted = notes.find(note => note.id === id);

//   // If all the required properties are present
//   if (deleted) {
//     notes = notes.filter(note => note.id !== id);
//     res.status(200).json(deleted);
//   } else {
//     res.status(404).json({ message: "Note you are looking for does not exist"})
//   }
// });

// listen to const PORT
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
