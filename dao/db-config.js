var mysql = require('mysql');

var connection = mysql.createPool({
    connectionLimit: 10,
    host : "geekasservicefirst.c0vaa1b1x0ys.us-west-2.rds.amazonaws.com",
    user: "content-app-user",
    password: "content-app-password",
    database: "share-content"
})

module.exports = connection;