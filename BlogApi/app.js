// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authorRoutes = require('./routes/authors');
const postRoutes = require('./routes/posts');

const app = express();
app.use(express.json());

app.use('/api/authors', authorRoutes);
app.use('/api/posts', postRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected");
    app.listen(8000, () => console.log("Server running on http://localhost:8000"));
}).catch(err => console.error(err));
