const express = require('express');

// imports the db.js router
const notesRouter = require('./db');

const app = express();

app.use('/api/notes', notesRouter);


module.exports = app;