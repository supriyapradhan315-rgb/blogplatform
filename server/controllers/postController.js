const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.log("GET POSTS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.log("GET POST ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const post = new Post({
      title,
      content,
      image,
      author: req.user.id,
    });

    await post.save();

    res.json(post);
  } catch (err) {
    console.log("CREATE POST ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  const { title, content } = req.body;

  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    res.json(post);
  } catch (err) {
    console.log("UPDATE POST ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: 'Post removed' });
  } catch (err) {
    console.log("DELETE POST ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};