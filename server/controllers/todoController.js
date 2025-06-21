const Todo = require('../models/Todo.js');

// Get all todos
exports.getTodos = async (req, res) => {
    // console.log('Fetching all todos');
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos', error });
    }
};

// Create a new todo
exports.createTodo = async (req, res) => {
    // console.log('Creating a new todo');
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    try {
        const newTodo = new Todo({ title });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo', error });
    }
};

// Update a todo
exports.updateTodo = async (req, res) => {
    // console.log('Updating a todo');
    const { id } = req.params;
    const { title, completed } = req.body;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { title, completed, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating todo', error });
    }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
    // console.log('Deleting a todo');
    const { id } = req.params;

    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo', error });
    }
};