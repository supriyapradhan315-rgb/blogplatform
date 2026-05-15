require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

app.use('/uploads', express.static('uploads'));

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/blogplatform', {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
    });
    console.log("MongoDB connected");

    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/posts', require('./routes/posts'));
    app.use('/api/comments', require('./routes/comments'));

    app.get("/", (req, res) => {
      res.send("API Running");
    });

    app.listen(5000, '0.0.0.0', () => {
      console.log("Server running on port 5000");
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  }
};

startServer();