// Modules
const express = require('express');
const mysql = require('mysql');
const mysqlx = require('@mysql/xdevapi');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const sanitizer = require('./sanitizer')

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

const session = mysqlx.getSession({
    host: 'localhost',
    user: 'root',
    password: 'root',
    schema: 'client', // Use your database name as the schema
    port: 33060       // X Protocol port
})
.then((session) => {
    console.log("Connected to MySQL using X Protocol!");

    // Login Endpoint
    app.post('/login', async (req, res) => {
        const sanitizedInputs = sanitizer.sanitizeObject(req.body);

        const query = `SELECT username FROM users WHERE username = '${sanitizedInputs.username}' AND password = '${sanitizedInputs.password}'`;

        console.log(query)
        try {

            const results = await session.sql(query).execute();

            const rows = results.fetchAll();

            if (rows.length > 0) {
                res.send('Login successful!');
            } else {
                res.send('Invalid credentials.');
            }
        } catch (error) {
            console.error('Query error:', error.message);
            res.status(500).send('An error occurred.');
        }
    });
    // Start the Express server
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch((err) => {
    console.error('Connection error:', err.message);
});