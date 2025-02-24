// Modules
const express = require('express');
const mysql = require('mysql');
const mysqlx = require('@mysql/xdevapi');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

const session = mysqlx.getSession({
    host: 'localhost',
    user: 'root',
    password: 'root',
    schema: 'client', // Use your database name as the schema
    port: 33060       // X Protocol port
});


app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    connection.query(query, [username, password], (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.send('Login successful!');
        } else {
            res.send('Invalid credentials.');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});