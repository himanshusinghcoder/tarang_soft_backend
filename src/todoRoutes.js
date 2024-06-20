const express = require('express');
const Todo = require('./todoModel');
const router = express.Router();

// Create a new Todo
router.post('/', async (req, res) => {
    const { title } = req.body;
    const newTodo = new Todo({ title });
    await newTodo.save();
    res.json(newTodo);
});

// Get all Todos
router.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// Get a single Todo
router.get('/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
});

// Update a Todo
router.put('/:id', async (req, res) => {
    const { title, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { title, completed }, { new: true });
    res.json(updatedTodo);
});

// Delete a Todo
router.delete('/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
});

module.exports = router;
