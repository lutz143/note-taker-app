const fb = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// get route for the notes in db.json
fb.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);

  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// post route for inputting new notes
fb.post('/', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received for a new note!`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

module.exports = fb;