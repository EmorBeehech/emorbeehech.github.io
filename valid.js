const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Simulate a database to store blog entries
const blogEntries = [];

// Endpoint to submit a new blog entry
app.post('/submit', (req, res) => {
  const { title, content } = req.body;
  blogEntries.push({ title, content });
  res.status(201).json({ message: 'Blog entry submitted successfully.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
