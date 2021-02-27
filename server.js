// Required dependencies
const express = require('express');
const notes = require('./Develop/data/db.json');

// Instantiates the server
const PORT = process.env.PORT || 3001;
const app = express();

// Route to homepage
app.get('/', function (req, res) {
  res.send('hello!');
});

// Route to get JSON notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
  });

// Method to make the server listen
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
  });