var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    app = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/restfulblog");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));// for method-override whenever it see a parameter _method
                                    // take it as a get or post or put or delete request


// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

 // Blog.create({title: "Canada", image: "https://images.unsplash.com/photo-1501371703172-850ab6b6e282?dpr=1&auto=compress,format&fit=crop&w=407&h=&q=80&cs=tinysrgb&crop=", body: "Canada Truely Live!!"});
// RESTFUL ROUTES
app.get("/", function(req, res){
  res.redirect("/blogs");
});

// INDEX ROUTES
app.get("/blogs", function(req, res){
  Blog.find({}, function (err, blogpost) {
    if(err){
      console.log(err);
    }
    else{
      res.render("index", {blogs: blogpost});
    }
  })
});

// NEW ROUTES
app.get("/blogs/new", function(req, res){
  res.render("new");
});

// CREATE POSTS
app.post("/blogs", function(req, res){
  req.body.blog.body = req.sanitize(req.body.blog.body)
  Blog.create(req.body.blog, function(err, newBlog){
    if(err){
      res.render("new");
    }
    else{
      res.redirect("/blogs");
    }
  })
});

// SHOW POSTS
app.get("/blogs/:id", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err){
      res.redirect("/blogs");
    }
    else{
      res.render("show", {blog: foundBlog})
    }
  })
});

//  EDIT ROUTES
app.get("/blogs/:id/edit", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err){
      res.redirect("/blog");
    }
    else{
      res.render("edit", {blog: foundBlog});
    }
  })
});

// UPDATE ROUTES
app.put("/blogs/:id", function(req, res){
  req.body.blog.body = req.sanitize(req.body.blog.body)
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
    if(err){
      res.redirect("/blogs");
    }
    else{
      res.redirect("/blogs/" + req.params.id);
    }
  })
});

// DESTROY ROUTES
app.delete("/blogs/:id", function(req, res){
  Blog.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/blogs");
    }
    else{
      res.redirect("/blogs");
    }
  })
});

// SERVER CONFIG!!
app.listen("3000", function()
{
  console.log("Sever Running");
})
