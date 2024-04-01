const express = require('express');
const app = express();
const PORT = 4000; // You can change the port if needed

// Sample data for songs
const songs = [
  { id: 1, title: 'Song 1', artist: 'Artist 1' ,url:"https://www.youtube.com/results?search_query=o+mahi+o+mahi"},
  { id: 2, title: 'Song 2', artist: 'Artist 2' },
  { id: 3, title: 'Song 3', artist: 'Artist 3' },
];

// Routes
app.get('/api/songs', (req, res) => {
  res.json(songs);
});

app.get('/api/songs/:id', (req, res) => {
  const song = songs.find(song => song.id === parseInt(req.params.id));
  if (!song) return res.status(404).json({ message: 'Song not found' });
  res.json(song);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
