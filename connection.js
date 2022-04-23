const mysql = require('mysql2')
const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: 'root',
    database: 'tracker_db'
},
console.log('Connected to db')
)

module.exports = db;