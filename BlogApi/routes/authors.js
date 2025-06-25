const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// Create author
router.post('/', async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List all authors
router.get('/', async (req, res) => {
  const authors = await Author.find();
  res.json(authors);
});

module.exports = router;
