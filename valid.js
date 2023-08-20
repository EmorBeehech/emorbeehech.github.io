const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/blogApp', { useNewUrlParser: true, useUnifiedTopology: true });

const BlogEntry = mongoose.model('BlogEntry', {
  title: String,
  content: String,
  timestamp: { type: Date, default: Date.now }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public')); // Serve static files from the 'public' folder

// A simple password for demonstration purposes
const correctPassword = 'securepassword';

app.post('/submit', async (req, res) => {
  const { password, title, content } = req.body;

  if (password !== correctPassword) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const newEntry = new BlogEntry({ title, content });
  await newEntry.save();
  res.status(201).json({ message: 'Blog entry submitted successfully.' });
});

app.get('/get-blogs', async (req, res) => {
  const entries = await BlogEntry.find().sort('-timestamp');
  res.json(entries);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
