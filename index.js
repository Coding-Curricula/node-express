const express = require('express');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.ENV_PORT || 8080;

// ENDPOINT
app.get('/', (req, res) => {
    res.send('Hello TEAM UN!');
});

// ENDPOINT with query params
app.get('/api', (req, res) => {
    const { name, title } = req.query;
    res.send(`Hello ${title} ${name}!`);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});