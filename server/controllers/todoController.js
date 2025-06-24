const Todo = require('../models/Todo.js');

// Get all todos
exports.getTodos = async (req, res) => {
    // console.log('Fetching all todos');
    try {
        const todos = await Todo.find({ user: req.user._id}).sort({ createdAt: -1 });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos', error });
    }
};

// Create a new todo
exports.createTodo = async (req, res) => {
    // console.log('Creating a new todo');
    const { title, dueDate, priority } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    try {
        const newTodo = new Todo({ title, dueDate, priority, user: req.user._id });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo', error });
    }
};

// Update a todo
exports.updateTodo = async (req, res) => {
    // console.log('Updating a todo');
    // const { id } = req.params;
    const { title, completed, dueDate, priority } = req.body;

    try {
        const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        if (title !== undefined) todo.title = title;
        if (completed !== undefined) todo.completed = completed;
        if (dueDate !== undefined) todo.dueDate = dueDate;
        if (priority !== undefined) todo.priority = priority;
        todo.updatedAt = Date.now(); // Update the timestamp
        const updatedTodo = await todo.save();

        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating todo', error });
    }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
    // console.log('Deleting a todo');
    // const { id } = req.params;

    try {
        const deletedTodo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo', error });
    }
};