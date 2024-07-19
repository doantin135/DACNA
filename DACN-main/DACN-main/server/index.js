var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
const cors = require("cors");
var app = express();
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
var con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "1234",
    insecureAuth: true,
    database: "signup",
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!!!");
    var sql = "SELECT * FROM signup.login";
    con.query(sql, function (err, results) {
        if (err) throw err;
        console.log(results);
    });
});

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    con.query(sql, [values], (err, data) => {
        if (err) {
            console.error('Error signing up:', err);
            return res.json("Error");
        }
        return res.json(data);
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE  `email` = ? AND `password` = ?";
    con.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error('Error logging in:', err);
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Fail");
        }
    });
});

const PORT = 1234;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
