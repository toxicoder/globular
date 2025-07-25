const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;
const CITIES_FILE = path.join(__dirname, 'data', 'cities.json');

app.use(cors());
app.use(bodyParser.json());

// GET /api/cities - Get the list of cities
app.get('/api/cities', (req, res) => {
  fs.readFile(CITIES_FILE, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading cities file');
    }
    res.json(JSON.parse(data));
  });
});

// POST /api/cities - Update the list of cities
app.post('/api/cities', (req, res) => {
  const { cities } = req.body;
  if (!cities || !Array.isArray(cities)) {
    return res.status(400).send('Invalid data format');
  }

  fs.writeFile(CITIES_FILE, JSON.stringify(cities, null, 2), 'utf8', (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error writing cities file');
    }
    res.status(200).send('Cities updated successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
