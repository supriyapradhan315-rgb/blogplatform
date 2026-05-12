const Comment = require('../models/Comment');

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('user', 'username').sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createComment = async (req, res) => {
  const { text } = req.body;
  try {
    const comment = new Comment({ text, user: req.user.id, post: req.params.postId });
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await Comment.findByIdAndRemove(req.params.id);
    res.json({ message: 'Comment removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};