const express = require('express');
const fs = require('fs');
const cors = require('cors');  
const bodyParser = require('body-parser');

const app = express();
app.use(cors());  
app.use(bodyParser.json());

const DATA_FILE = 'data.json';

// POST: Add new user
app.post('/users', (req, res) => {
  const newUser = req.body;

  let users = [];
  if (fs.existsSync(DATA_FILE)) {
    users = JSON.parse(fs.readFileSync(DATA_FILE));
  }

  newUser.id = users.length + 1;
  users.push(newUser);

  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));

  res.status(201).json(newUser);
});

// GET: View all users
app.get('/users', (req, res) => {
  if (fs.existsSync(DATA_FILE)) {
    const users = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(users);
  } else {
    res.json([]);
  }
});

app.listen(3000, () => console.log('✅ Server running on http://localhost:3000'));
