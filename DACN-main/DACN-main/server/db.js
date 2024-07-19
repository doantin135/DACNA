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

const PORT = process.env.PORT || 5555;
app.listen(PORT, function () {
  console.log(`Demo dacn at: ${PORT}!`);
}); 
var con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "1234",
    insecureAuth: true,
    database: "dacn",
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!!!");
    var sql = "SELECT * FROM dacn.dataset";
    con.query(sql, function (err, results) {
        if (err) throw err;
        console.log(results);
    });
});

app.get("/get", function (req, res) {
    var sql = "SELECT * FROM dacn.dataset";
    con.query(sql, function (err, results) {
      if (err) throw err;
      res.send(results);
    });
  });