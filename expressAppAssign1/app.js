// **************************************************
// Importing express file into app
// **************************************************
var express = require('express');
var app = express();

// **************************************************
// Home page path...
// **************************************************
app.get("/", function(req, res){
	res.send("Hi there, Welcome to my assignment!!");
	console.log("Someone requested for Homepage");
});

// **************************************************
// Page for each parameter...
// **************************************************
app.get("/speak/:animalName", function(req, res){
	var animal = req.params.animalName;
	// animal = animal.toUpperCase();
	var sounds = {
		cat: "Meow!!",
		dog: "Woof Woof Woof!!",
		pig: "Oink!!",
		cow: "Moo!!",
	};
	console.log( animal + " says " +sounds[animal]);
	res.send("The " + animal + " says " + sounds[animal]);
	// **************************************************
	// This is an Extended version
	// **************************************************
	// if(animal === "PIG")
	// 	{
	// 		res.send("The " + animal + " says \'oink\'");
	// 	}
	// else if(animal === "COW")
	// 	{
	// 		res.send("The " + animal + " says \'Moo\'");
	// 	}
	// else if (animal === "DOG") 
	// 	{
	// 		res.send("The " + animal + " says \'Woof Woof!!\'");
	// 	}
});

// **************************************************
// To print the parameter passed request no. of times.
// **************************************************
app.get("/repeat/:hello/:no", function(req, res){
	var hello = req.params.hello;
	var no = Number(req.params.no);
	console.log("Print " + hello + " " + no + " times")
	var result = ""; // Empty string variable "result"
	for(var i = 0; i <= no; i++)
	{
		result += hello + " ";	// We cannot send multiple response, so 
								// we store it in one variable and send it at last
	}
		res.send(result);		// Send the response one time with the message

});

// **************************************************
// For unavailable URL requests
// **************************************************
app.get("*", function(req, res){
	res.send("Sorry page not available!! Please check your URL");
	console.log("Someone requested for unavailable url");
});

// **************************************************
// Server config...
// **************************************************
app.listen("3000", function(){
	console.log("Server started on port 3000");
});
