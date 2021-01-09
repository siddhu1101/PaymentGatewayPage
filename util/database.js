const mysql = require("mysql2");

const pool = mysql.createPool({
    user: "root",
    host: "localhost",
    database: "card-details",
    password: "root@123"
});

module.exports = pool.promise();