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
})
.then((session) => {
    console.log("Connected to MySQL using X Protocol!");

    // Login Endpoint
    app.post('/login', async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        const query = `SELECT username FROM users WHERE username = '${username}' AND password = '${password}'`;

        console.log(query)
        try {
            // // Access the 'users' table in the 'client' schema
            // const table = session.getSchema('client').getTable('users');

            // // Query the table using X Protocol
            // const results = await table
            //     .select('username', 'password')
            //     .where('username = :username AND password = :password')
            //     .bind('username', username)
            //     .bind('password', password)
            //     .execute();


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