var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    CampGround = require("./models/campgrounds"),
    // Comment = require("./models/comment"),
    // User = require("./models/user"),
    seedDB = require("./seeds");


seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
// Ejs Enabled...
app.set("view engine", "ejs");

 // Landing Page...
app.get("/", function(req, res){
  res.render("landing");
});

// CampGround Page...
app.get("/campgrounds", function(req, res){
    CampGround.find({}, function (err, allCampgrounds) {
        if(err){
            console.log(err);
        }
        else{
            res.render("index", {campgrounds: allCampgrounds});
        }
    })
});

// This is not the same page as CampGround page as the method is post.
app.post("/campgrounds", function(req, res){
  // get data from form and add to  campgrounds database
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {name: name, image: image, description: description};
  // campgrounds.push(newCampground);
  CampGround.create(newCampground, function(err, pushed){
      if(err){
          console.log(err);
      }
      else{
          // redirect back to campground's page
          res.redirect("/campgrounds");
      }
  });
});

// NEW
app.get("/campgrounds/new", function(req, res){
  res.render("new.ejs");
});

// Show - Show more info about the places
app.get("/campgrounds/:id", function (req, res) {
  CampGround.findById(req.params.id).populate("comments").exec( function(err, foundCampground){
    if(err){
      console.log(err);
    }
    else{
        console.log(foundCampground);
      res.render("show", {campground: foundCampground});
    }
  });

});

// Server Do Not Change!!...
app.listen("3000", function(){
  console.log("YelpCamp Server Running");
});
