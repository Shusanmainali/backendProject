const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
// Test route
app.get("/", (req, res) => {
  res.send("E-commerce Backend API");
});

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Product routes
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

// Connect to MongoDB 
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" MongoDB Connected");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(" Mongo Error:", err));
