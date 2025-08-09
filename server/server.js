const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Your MySQL username
  password: '',  // Your MySQL password
  database: 'phtube',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Add a handler for the root route
app.get('/', (req, res) => {
  res.send('Welcome to PhTube API');
});

// Get all videos
app.get('/api/videos', (req, res) => {
  db.query('SELECT * FROM videos', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch videos' });
    } else {
      res.json(results);
    }
  });
});

// Get a single video by ID
app.get('/api/videos/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM videos WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch video' });
    } else {
      res.json(results[0]);
    }
  });
});

// Add a new video (with title)
app.post('/api/videos', (req, res) => {
  const { url, title } = req.body;  // Now accepting title as well
  db.query('INSERT INTO videos (title, url) VALUES (?, ?)', [title, url], (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add video' });
    } else {
      res.status(201).json({ message: 'Video added successfully' });
    }
  });
});

// Update video URL and title
app.put('/api/videos/:id', (req, res) => {
  const { id } = req.params;
  const { url, title } = req.body;  // Accept both title and URL

  db.query('UPDATE videos SET url = ?, title = ? WHERE id = ?', [url, title, id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update video' });
    } else {
      res.status(200).json({ message: 'Video updated successfully' });
    }
  });
});

// Delete a video
app.delete('/api/videos/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM videos WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete video' });
    } else {
      res.status(200).json({ message: 'Video deleted successfully' });
    }
  });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
