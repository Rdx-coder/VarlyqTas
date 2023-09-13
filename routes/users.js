// routes/users.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, usersController.getUsers);
router.post('/', usersController.createUser);
router.delete('/:id', authMiddleware, usersController.deleteUser);
router.put('/:id', authMiddleware, usersController.updateUser);

module.exports = router;
