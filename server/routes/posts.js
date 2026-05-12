const express = require('express');
const multer = require('multer');
const path = require('path');
const { getPosts, getPost, createPost, updatePost, deletePost } = require('../controllers/postController');
const auth = require('../middleware/auth');
const router = express.Router();

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

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, upload.single('image'), createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;