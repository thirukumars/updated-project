const express = require("express");
var mysql = require("mysql");
const axios = require("axios");
const path = require("path");
const multer = require("multer");
var fs = require("fs");
var Blob = require("blob");
var FileReader = require("fs");
var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "expression_detection",
});
connection.connect((err) => {
	if (!!err) {
		console.log("error");
	} else {
		console.log("connected");
	}
});
const app = express();
var image_name = "";
app.use(express.static(__dirname + "/public"));
function name(val) {
	console.log("val" + val);
	image_name = val;
}

const storage = multer.diskStorage({
	destination: "./public/uploads/",
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
const upload = multer({
	storage: storage,
	limits: { fileSize: 1000000 },
}).single("myImage");
// const router = express.Router();

app.post("/upload", function (req, res) {
	upload(req, res, function (err) {
		image_name = req.file.filename;
		console.log("Request ---", req.body);
		console.log("Request file ---", req.file); //Here you get file.
		console.log("Request file ---", req.file.filename);
		uploadImage();

		/*Now do where ever you want to do*/
		if (!err) {
			return res.sendStatus(200).end();
		}
	});

	function uploadImage() {
		console.log("name" + image_name);
		var praveen = {
			image: fs.readFileSync(`./public/uploads/${image_name}`),
			name: image_name,
		};
		connection.query("INSERT INTO images SET ? ", praveen, function (
			err,
			result
		) {
			console.log(result);
		});
	}
});

app.get("/datas", (req, res) => {
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
const outputfile = "output.png";

app.get("/image", (req, res) => {
	var imageArray = [];
	connection.query("SELECT * FROM images", (error, row, fields) => {
		if (!!error) {
			console.log("Error in the query");
		} else {
			console.log("seccessful query");
			console.log(row[0].id);
			// var img = <img src={"data:image/jpeg;" + bufferBase64} />;
			// var reader = FileReader();
			// FileReader.readAsDataURL(row[0].image);  /// error in this line
			// FileReader.onloadend = function () {
			// 	var base64data = reader.result;
			// 	console.log(base64data);
			// };

			// var imageBuffer = row[0].image.buffer;
			// var imageName = "public/images/map.png";

			// fs.createWriteStream(imageName).write(imageBuffer);
			var BlOBImage = row[0].image;
			res.send(BlOBImage);
			// var buffer = new Buffer(row[0].image, "binary");
			// var bufferBase64 = buffer.toString("base64");
			// const imageDisplay = ({ bufferBase64 }) => (
			// 	<img src={`data:image/jpeg;base64,${bufferBase64}`} />
			// );
			// res.send(bufferBase64);
			// res.sendFile(path.resolve(__dirname, "./public/uploads/boobal.jpg")); //it will display the image in path
			// res.send(imageDisplay);

			// res.send(row[0].image);
			// imageArray = imageArray.push(bufferBase64);
		}
	});
});

// app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

nameArray = [];
app.post("/nameArray", function (req, res) {
	nameArray = req.body;
	console.log(req.body);
	for (let i = 0; i < nameArray.length; i++) {
		var query = "INSERT INTO name_array (`name`) VALUES (?)";
		var values = nameArray[i];
		connection.query(query, values, (err, result) => {
			if (err) {
				console.log(err);
			} else {
				console.log(
					"total number of rows affected in namearray" + result.affectedRows
				);
			}
		});
	}
});
app.get("/nameArray", function (req, res) {
	var names;
	connection.query("SELECT * FROM name_array", (error, row, fields) => {
		if (!!error) {
			console.log("Error in the query");
		} else {
			console.log("seccessful query");
			console.log(row.length);
			res.send(row);
			for (let i in row) {
				console.log(row[i].name);
			}
		}
	});
	// res.json(names);
});
// app.use(express.urlencoded());

// Access the parse results as request.body
app.post("/", function (request, response) {
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
