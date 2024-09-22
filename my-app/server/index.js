require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');

// Middleware
app.use(express.json());
app.use(cors);

// MongoDB Connection
connection()

// Server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})
