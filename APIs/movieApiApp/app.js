var express = require('express');
var app = express();
var request = require('request');

app.set("view engine", "ejs");	// ejs

app.get("/search", function(req, res){
	res.render("search");
});

app.get('/result', function (req, res) {
	// body...
	console.log(req.query.search);// Search is the name given in input at search.ejs
	var query = req.query.search; // Assigning the value to a variable
	//  The given way below is possible...
	// But it is better to make the url a variable and concatinate it
	// request("http://www.omdbapi.com/?s="+ query, function (error, response, body){
	var url = "http://www.omdbapi.com/?s=" + query;
	request(url+ query, function (error, response, body){
		if(!error && response.statusCode == 200){
			var result = JSON.parse(body);		// As body is a string we need to parse it to an object to access the content
			// res.send(result[Search][0][Title]); // Only for movie app
			res.render("result", {data: result});
		}
	});
});

app.listen('3000', function () {
	// body...
	console.log("Server Running");
});
