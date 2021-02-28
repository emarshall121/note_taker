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
  console.log(body);
  // our function's main code will go here!
  // return finished code to post route for response
  return body;
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
  
  res.json(req.body);
});

// Listener for server
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
  });