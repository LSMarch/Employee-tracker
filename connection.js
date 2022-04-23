const mysql = require('mysql2')
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
},
console.log('Connected to db')
)

module.exports = db;