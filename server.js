require("dotenv");
const http    = require("http"),
https   = require("https"),
express = require("express"),
fs      = require("fs");  

      
    var app = express();
    app.use(function (req, res, next) {
        if (req.secure) {
            next();
        } else {
            res.redirect('https://' + req.headers.host + req.url);
        }
    });

const mysql = require('mysql2');

// create the connection to database
var connection = mysql.createConnection({
    host: "mysql-project.ckfo5aylgcj5.us-east-2.rds.amazonaws.com",
    user: "root",
    password: "Abudabi%67",
    port: 3306
});

connection.query(
    'SELECT * from student.users',
    function (err, results) {
        console.log(results);
    }
);

const option = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("server.crt"),
    passphrase: "localhost"
}

https.createServer(option, app);
http.createServer(app).listen(3000);
