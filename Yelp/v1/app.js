var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
// Ejs Enabled...
app.set("view engine", "ejs");

var campgrounds = [
  {name: "San Franscisco", image:"https://farm1.staticflickr.com/11/14161647_266f83ada9.jpg"},
  {name: "West Lafayet", image:"https://farm2.staticflickr.com/1269/4609793764_815960558c.jpg"},
  {name: "Concordia", image:"https://farm2.staticflickr.com/1028/944124590_ed765b3ac8.jpg"},
  {name: "British Columbia", image:"https://farm1.staticflickr.com/729/31404388571_3d5ce4910b.jpg"},
];

 // Landing Page...
app.get("/", function(req, res){
  res.render("landing");
});

// CampGround Page...
app.get("/campgrounds", function(req, res){
  res.render("campgrounds", {campgrounds: campgrounds});
});

// This is not the same page as CampGround page as the method is post.
app.post("/campgrounds", function(req, res){
  // get data from form and add to  campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  // redirect back to campgroundspage
  res.redirect("/campgrounds");
});

// This is for submitting the new item
app.get("/campgrounds/new", function(req, res){
res.render("new.ejs");
});

// Server Do Not Change!!...
app.listen("3000", function(){
  console.log("YelpCamp Server Running");
});
