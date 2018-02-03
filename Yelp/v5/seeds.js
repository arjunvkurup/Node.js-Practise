var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

/*Adding Default Data content for checking*/
var data = [
    {
        name: "Canada",
        image:"https://farm3.staticflickr.com/2235/2123523275_983f039f2b.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, ad adipisci, aliquid amet culpa deserunt dignissimos enim eos id magni, minima molestias numquam pariatur perspiciatis quaerat quibusdam sapiente similique voluptatum."
    },
    {
        name: "Canada panda",
        image:"https://farm1.staticflickr.com/428/19470834678_7c0aca13f0.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, ad adipisci, aliquid amet culpa deserunt dignissimos enim eos id magni, minima molestias numquam pariatur perspiciatis quaerat quibusdam sapiente similique voluptatum."
    },
    {
        name: "Canada Banff, Alberta ",
        image:"https://farm8.staticflickr.com/7055/6778418934_66e99a6a93.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, ad adipisci, aliquid amet culpa deserunt dignissimos enim eos id magni, minima molestias numquam pariatur perspiciatis quaerat quibusdam sapiente similique voluptatum."
    }
];

function seedDB(){
    // Removed All Campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Removed CampGrounds");
        data.forEach(function (seed) {
            Campground.create(seed, function (err, data) {
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Added a data");
                    Comment.create({
                        text: "This Place is absolutely beautiful",
                        author: "Arjun"
                    }, function (err, comment) {
                        if(err){
                            console.log(err);
                        }
                        else{
                            data.comments.push(comment);
                            data.save();
                            console.log("Added Comment");
                        }

                    })
                }
            });
        });
    });
    // Add a few Campgrounds

}

module.exports = seedDB;