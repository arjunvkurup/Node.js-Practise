var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
var friends = ["margorie", "sansa", "jon", "dracarus"];

app.get("/", function (req, res) {
    res.render("home");         // for views/home.ejs
});

app.post("/addFriend", function (req, res) {
    var newFriend = req.body.newFriend; // an object that contain all the data from the html page
    friends.push(newFriend);			// Adding into the array of names
    // res.send("friend added");
    res.redirect("/friends");
});

app.get("/friends", function (req, res) {
    res.render("friends", {friends: friends});
});

app.listen("3000", function () {
   console.log("Server Running pretty well!!");
});