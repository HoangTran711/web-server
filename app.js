const express = require('express');
const mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors')

const db = mysql.createConnection({
	host: 'localhost',
	user : 'root',
	password: 'KoOn711286',
	database: 'Shopping'
})
db.connect((err) => {
	if(err){
		throw err;
	}
	console.log('MySql Connected...');
})
const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json())
app.get('/getall-products', (req,res) => {
	let sql = "select * from products";
	let query = db.query(sql, (err, result) => {
		if(err) throw err;
		res.send(result)
	})
})
app.post('/insert-product', (req,res) => {
	let sqlTest = 'INSERT INTO products SET ?';
	let sql = "select * from products";
	db.query(sql, (err, result) => {
		if(err) throw err;
		const temp = {
			...req.body,
			id: result.length + 1
		}
		db.query(sqlTest,temp, (err, result) => {
			if(err) throw err;
			res.send(result)
		})
	})
	
})
app.get('/get-product/:id', (req,res)=> {
	let sql = `select * from products where id=${req.params.id}`
	db.query(sql, (err, result) => {
		if(err) throw err;
		res.send(result)
	})
}) 
app.delete('/delete/:id', (req,res) => {
	let sql = `DELETE FROM products WHERE id=${req.params.id}`
	db.query(sql, (err,result) => {
		if(err) throw err;
		res.send(result);
	})
})
app.get('/get-orders', (req,res) => {
	let sql = `select * from orders`
	db.query(sql, (err,result) => {
		res.send(result)
	})
})
app.post('/update/:id', (req,res) => {
	let sqlDelete = `DELETE FROM products WHERE id=${req.params.id}`
	let sql = `INSERT INTO products SET ?`
	db.query(sqlDelete, (err,result) => {
		const temp = {
			...req.body,
			id: req.params.id
		}
		if(err) throw err;
		db.query(sql,temp, (err, result) => {
			if(err) throw err;
			res.send(result)
		})
	})
})
app.listen('3000', () => {
	console.log('Server started on port 3000');
})