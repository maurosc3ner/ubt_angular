const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/tests', (req, res, next) => {
    const post = [
        {
        id: '3',
        title: 'backend json test'
        },
        {
            id: '2',
            title: 'backend json test'
        }
]
    res.status(200).json({
        status:'OK',
        post:post
    });
});

module.exports = app;