const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Endpoint to receive POST data and update temperature
app.post('/updateData', (req, res) => {
  const { temperature, lightIntensity } = req.body;

  // Update JSON file with temperature and light intensity values
  updateData(temperature, lightIntensity, (err) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('Data updated successfully');
      res.json({ message: 'Data updated successfully' });
    }
  });
});

// Function to update temperature and light intensity values in JSON file
function updateData(temperature, lightIntensity, callback) {
  // Read existing data from JSON file
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }

    let jsonData = {};

    try {
      // Parse JSON data
      jsonData = JSON.parse(data);
    } catch (parseError) {
      return callback(parseError);
    }

    // Update temperature and light intensity values
    jsonData.temperature = temperature;
    jsonData.lightIntensity = lightIntensity;

    // Write updated data back to JSON file
    fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), 'utf8', (writeErr) => {
      if (writeErr) {
        return callback(writeErr);
      }
      callback(null);
    });
  });
}

// Endpoint to get temperature and light intensity data
app.get('/getData', (req, res) => {
  // Read data from JSON file
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    let jsonData = {};

    try {
      // Parse JSON data
      jsonData = JSON.parse(data);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Send data in response
    res.json(jsonData);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
