/// @MySQL : mysql.js

const mysql = require('mysql');
require('colors');

const connection = mysql.createConnection({
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT || 3306,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
    connectTimeout: 20000
});

connection.connect((err) => {
    if (err) {
        console.error('\n(js) Error connecting to database:'.red, err.stack);
        return;
    }
    console.log('(js) Connected to database with ID:'.green, connection.threadId);

    connection.query(`USE ${process.env.SQL_DATABASE}`, (err) => {
        if (err) {
            console.error('(js) Error selecting database:'.red, err);
        } else {
            console.log('(js) Database selected:'.green, process.env.SQL_DATABASE);
        }
    });
});

module.exports = connection;
