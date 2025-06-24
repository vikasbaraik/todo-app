const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {getTodos, createTodo, updateTodo, deleteTodo} = require('../controllers/todoController');

// Apply authentication middleware to all routes
router.use(authMiddleware);

router.get('/', getTodos);
router.post('/', createTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
