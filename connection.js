const mysql = require('mysql2')
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost', 
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
},
console.log('Connected to db')
)

module.exports = db;