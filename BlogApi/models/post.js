const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
