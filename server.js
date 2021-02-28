const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
const notes = require('./develop/data/db.json');

// Functions
function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);

  fs.writeFileSync(
    path.join(__dirname, './Develop/data/notes.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  
  return note;
}

// API Routes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/', (req, res) => {
  res.send('hello');
});

// POST Routes
app.post('/api/notes', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();
  
  // add note to json file and notes array in this function
  const note = createNewNote(req.body, notes);
  
  res.json(note);
});

// Listener for server
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
  });