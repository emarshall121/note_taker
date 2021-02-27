// Required dependencies
const express = require('express');
const notes = require('./Develop/data/db.json');

// Instantiates the server
const PORT = process.env.PORT || 3001;
const app = express();

// Functions
function findById(id, notesArray) {
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
  }

// HTML Routes
app.get('/', function (req, res) {
  res.send('hello!');
});

// API Routes
app.get('/api/notes', (req, res) => {
  res.json(notes);
  });

// Method to make the server listen
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
  });