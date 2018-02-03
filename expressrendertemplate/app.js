var express = require('express');
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");  //This is for not using [name].ejs in all the function rendering

app.get("/", function(req, res){
	res.render("home"); 	// Always have a views file where the render will always check for the file first
});

app.get("/love/:thing", function(req, res){
	var thing = req.params.thing;
	res.render("love", {thingVar: thing});
});

app.get("/posts", function (req, res) {
    var posts = [
        {title: "What an amazing experiece!!", author: "pique"},
        {title: "Amazing America", author: "Arjun"},
        {title: "Click of a button!" , author: "Sandra"}
    ];
    res.render("post", {posts: posts});// Alternative way is to use post.ejs without including app.set()...
})

app.listen("4040", function(){
	console.log("Server is running");
});