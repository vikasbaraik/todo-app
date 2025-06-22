const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.find({ email });
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // Check if username is already taken
        const existingUsername = await User.find({ username });
        if (existingUsername.length > 0) {
            return res.status(400).json({ error: 'Username already taken' });
        }
        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }
        // Hash the password and save the user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        // Generate a JWT token
        // const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
        // res.status(200).json({ token, userId: user._id, username: user.username });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        // Check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ token, userId: user._id, username: user.username });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

module.exports = router;