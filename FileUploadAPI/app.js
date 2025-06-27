import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8000;

// configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// create uploads folder if it doesn’t exist
import fs from 'fs';
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}


app.post("/upload", upload.single("myFile"), (req, res) => {
  res.json({
    message: "File uploaded successfully",
    file: req.file
  });
});


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
