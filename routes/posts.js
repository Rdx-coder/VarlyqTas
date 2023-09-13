// routes/posts.js
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const authMiddleware = require('../middleware/authMiddleware');
const { validatePost } = require('../middleware/validateMiddleware');

router.get('/', authMiddleware, postsController.getPosts);
router.post('/', authMiddleware, validatePost, postsController.createPost);
router.delete('/:id', authMiddleware, postsController.deletePost);
router.put('/:id', authMiddleware, postsController.updatePost);

module.exports = router;
