const mysql = require('mysql')
const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'job_test',
    user: 'root',
    password: ''
})

module.exports = conn