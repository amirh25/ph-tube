const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'phtube',
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

app.get('/', (req, res) => {
  res.send('Welcome to PhTube API');
});

app.get('/api/videos', (req, res) => {
  db.query('SELECT * FROM videos', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch videos' });
    } else {
      res.json(results);
    }
  });
});

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

app.post('/api/videos', (req, res) => {
  const { url, title } = req.body; 
  db.query('INSERT INTO videos (title, url) VALUES (?, ?)', [title, url], (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add video' });
    } else {
      res.status(201).json({ message: 'Video added successfully' });
    }
  });
});

app.put('/api/videos/:id', (req, res) => {
  const { id } = req.params;
  const { url, title } = req.body;  

  db.query('UPDATE videos SET url = ?, title = ? WHERE id = ?', [url, title, id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update video' });
    } else {
      res.status(200).json({ message: 'Video updated successfully' });
    }
  });
});


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
