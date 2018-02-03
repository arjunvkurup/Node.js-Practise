var express = require('express');
var app = express();

// Route 1
app.get("/", function(req, res){
  console.log("someone made a request to home page ");
  res.send("Hi There");
});

// Route 2
app.get("/bye", function(req, res){
  res.send("GoodBye!!");
  console.log("Someone made a request to /bye");
});

// Route 3
app.get("/dog", function(req, res){
  res.send("Meow");
  console.log("Someone made a request to /dog");
});

// Route containg Route parameters
// Route for any name or id after /r/...  ":" is used for showing result for any thing that we type in.
app.get("/r/:subRedditName", function(req, res){
	// body...
	var sub = req.params.subRedditName;
	res.send("Welcome to Sub Reddit!");
	console.log("Request for " + req.params.subRedditName.toUpperCase());
});

// code for more random path to know more about req use req() and then find params
app.get("/r/:subRedditName/comments/:id/:title", function(req, res){
	res.send("Yallow!!");
	var sub = req.params.title;
	console.log("Welcome to " + sub.toUpperCase() + " SUBREDDIT");
});

// "*" is used to redirect any routes to another page other than the routes described (Order of routes matter * should be last)
app.get("*", function(req, res){
  res.send("You are a star");
});

// Listen to IP adress on port 3000
app.listen('3000', function(){
  console.log("Server has started on port 3000");
});
