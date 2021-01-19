"use strict";

var express = require('express');

var mysql = require('mysql');

var bodyParser = require('body-parser');

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'KoOn711286',
  database: 'Shopping'
});
db.connect(function (err) {
  if (err) {
    throw err;
  }

  console.log('MySql Connected...');
});
var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.get('/getall-products', function (req, res) {
  var sql = "select * from products";
  var query = db.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
app.post('/insert-product', function (req, res) {
  var sql = "insert ";
  res.send(req.body);
});
app.listen('3000', function () {
  console.log('Server started on port 3000');
});