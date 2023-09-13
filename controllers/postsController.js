// controllers/postsController.js
const Post = require('../models/postModel');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { message } = req.body;
    const createdBy = req.user.userId; 
    const post = new Post({
      createdBy,
      message,
    });

    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('createdBy', 'name email') 
      .populate({
        path: 'comments.sentBy',
        select: 'name email',
      })
      .populate('comments.liked', 'name email'); 
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.userId; 
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.createdBy.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to delete this post' });
    }

    await post.remove();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.userId; 
  const { message } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.createdBy.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to update this post' });
    }

    post.message = message;
    post.updatedAt = new Date();

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
