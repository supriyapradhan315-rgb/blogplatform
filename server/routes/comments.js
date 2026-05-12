const express = require('express');
const { getComments, createComment, deleteComment } = require('../controllers/commentController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/:postId', getComments);
router.post('/:postId', auth, createComment);
router.delete('/:id', auth, deleteComment);

module.exports = router;