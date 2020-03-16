const express = require("express");
var mysql = require("mysql");
const axios = require("axios");
var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "expression_detection"
});
connection.connect((err) => {
	if (!!err) {
		console.log("error");
	} else {
		console.log("connected");
	}
});
const app = express();

app.get("/api/customers", (req, res) => {
	const customer = [
		{ id: 1, firstname: "jhon", lastname: "doe" },
		{ id: 2, firstname: "praveen", lastname: "smith" },
		{ id: 3, firstname: "kumar", lastname: "swason" }
	];
	res.json(customer);
});
// axios
// 	.post("http://localhost:5000/upload/")
// 	.then((res) => console.log(res.statusCode));
// axios
// 	.get("http://localhost:5000/")
// 	.then((res) => console.log("hi"))
// 	.catch((err) => console.log(err));

// app.get("/upload", (req, res) => {
// 	res.json("hello upload");
// 	// console.log("got it");
// });

app.get("/", (req, res) => {
	connection.query("SELECT * FROM individual_result", (error, row, fields) => {
		if (!!error) {
			console.log("Error in the query");
		} else {
			console.log("seccessful query");
			console.log(row);
		}
	});
	res.json("hello");
});
// app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
// app.use(express.urlencoded());

app.post("/upload", (req, file, res) => {
	console.log("got it");
	console.log(req);
	// console.log(res);
});
app.get("/upload", (req, res) => {
	res.send("upload");
	// console.log(res);
});

// Access the parse results as request.body
app.post("/", function(request, response) {
	var name_Array = request.body.user.names_Array;
	var expression_Array = request.body.user.expression_Array;
	var Average_expression = request.body.user.Average_expression;
	console.log(request.body.user.names_Array);
	console.log(request.body.user.expression_Array);
	for (let i = 0; i < name_Array.length; i++) {
		var query =
			"INSERT INTO individual_result (`name`, `expression`, `image`) VALUES (?)";
		var values = [[name_Array[i], expression_Array[i], "image" + i]];
		connection.query(query, values, (err, result) => {
			if (err) {
				console.log(err);
			} else {
				console.log("total number of rows affected" + result.affectedRows);
			}
		});
	}
	var query1 = "INSERT INTO overall_expression (`expression`) VALUES (?)";
	var values1 = [[Average_expression]];
	connection.query(query1, values1, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log(
				"total number of rows affected in overall" + result.affectedRows
			);
		}
	});
});
const port = 5000;
app.listen(port, () => {
	console.log("server started on port " + port);
});
