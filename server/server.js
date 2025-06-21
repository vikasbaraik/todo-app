const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`server is listening at port ${PORT}`);
});