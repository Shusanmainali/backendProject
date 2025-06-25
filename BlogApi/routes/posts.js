const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Create post
router.post('/', async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all posts
router.get('/', async (req, res) => {
  const posts = await Post.find().populate('author', 'name email');
  res.json(posts);
});

// Read single post
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author');
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

// Update post
router.put('/:id', async (req, res) => {
  const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete post
router.delete('/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: 'Post deleted' });
});

module.exports = router;
