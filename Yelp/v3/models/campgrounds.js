/* SCHEMA SETUP */
var mongoose = require("mongoose");

var campGroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    /*Now this part is for creating a reference to the campground so that this
    * part will be enabled inside the campground eventhough it is not on the same schema
    * if commented u'll get to know about it*/
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
module.exports = mongoose.model("Campground", campGroundSchema);