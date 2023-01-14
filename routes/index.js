const express = require('express');

// imports the db.js router
const notesRouter = require('./db');

const app = express();

app.use('/db', notesRouter);


module.exports = app;