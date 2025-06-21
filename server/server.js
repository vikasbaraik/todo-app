const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// MongoDB connection test then start server
console.log('Connecting to MongoDB...');
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`server is listening at port ${PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));