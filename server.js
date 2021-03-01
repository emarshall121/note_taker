// Required Dependencies
const fs = require('fs');
const path = require('path');
const express = require('express');

// Sets the port number
const PORT = process.env.PORT || 3001;

// Creates the Express server
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// Allows server to access all public files
app.use(express.static('public'));

const notes = require('./data/db.json');
const { response } = require('express');

// Array to hold note data
let notesData = [];

// Functions
function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);

  fs.writeFileSync(
    path.join(__dirname, './data/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
  
  return note;
}

// HTML Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
})

// API Routes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();
  
  // add note to json file and notes array in this function
  const note = createNewNote(req.body, notes);
  
  res.json(note);
});

// Delete a note
app.delete("/api/notes/:noteId", (req, res) => {
  fs.readFile(path.join(__dirname, "/data/db.json"), (err, response) => {
    if (err) throw (err);
    let myArray = JSON.parse(response)
    let newArray = myArray.filter (note => note.id != req.params.noteId)
    console.log(newArray)
    fs.writeFile(path.join(__dirname, "/data/db.json"), JSON.stringify(newArray, null, 2), (err) => {
      if (err) throw (err);
    })
    return res.json(response)
  })
})

// Listener for server
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});