const fb = require('express').Router();
const { readFromFile, readAndAppend, writeToFile, overwriteFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
let notes = require('../db/db.json');
const { writeFile } = require('xlsx');

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
      id: uuid(),
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

// GET Route for a specific note
fb.get('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('../db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

fb.delete('/:id', (req, res) => {
  // Log that a DELETE request was received
  console.info(`${req.method} request received to delete a note!`);
  // Destructuring assignment for the items in req.body
  const { id } = req.params;

  const deleted = notes.find(note => note.id === id);

  // If all the required properties are present
  if (deleted) {
    notes = notes.filter(note => note.id !== id);
    res.status(200).json(`Deleted a Note`);
    overwriteFile(notes, './db/db.json');
  } else {
    res.status(401).json({ message: "Note you are looking for does not exist"})
  }
});

module.exports = fb;