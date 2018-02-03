var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    CampGround = require("./models/campgrounds"),
    Comment = require("./models/comment"),
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
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
  res.render("campgrounds/new");
});

// Show - Show more info about the places
app.get("/campgrounds/:id", function (req, res) {
  CampGround.findById(req.params.id).populate("comments").exec( function(err, foundCampground){
    if(err){
      console.log(err);
    }
    else{
        console.log(foundCampground);
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});
//=========================================================
// Comments Routes
//=========================================================
app.get("/campgrounds/:id/comments/new", function (req, res) {
    CampGround.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function (req, res) {
//    Lookup campground using id
    CampGround.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // console.log(req.body.comment);
            Comment.create(req.body.comment, function (err, comment) {
               if(err){
                   console.log(err);
               }
               else{
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/" + campground._id);
               }
            });
        }
    });
});

// Server Do Not Change!!...
app.listen("3030", function(){
  console.log("YelpCamp Server Running");
});
