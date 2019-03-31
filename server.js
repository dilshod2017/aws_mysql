const http    = require("http"),
https   = require("https"),
express = require("express"),
fs      = require("fs"),
hbs     = require("express-hbs");

      
    var app = express();
    // app.use(function (req, res, next) {
    //     if (req.secure) {
    //         next();
    //     } else {
    //         res.redirect('https://' + req.headers.host + req.url);
    //     }
    // });
// app.set('port', process.env.PORT || 3000);
app.set('trust proxy', 1) // trust first proxy
app.use(express.static("public"));

app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views','./views');

const mysql = require('mysql2');

// create the connection to database
// var connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     port: 3306
// });

// // create the connection to database
var connection = mysql.createConnection({
    host: "mysql-project.ckfo5aylgcj5.us-east-2.rds.amazonaws.com",
    user: "root",
    password: "Abudabi%67",
    port: 3306
});



app.get("/", (req, res)=>{
    connection.query(
    'SELECT * from project_profile.users',
    function (err, results) {
        console.log(results);
    }
    );
    res.render("home")

})
// connection.end();
const option = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("server.crt"),
    passphrase: "localhost"
}

// https.createServer(option, app);
http.createServer(app).listen(3000);
