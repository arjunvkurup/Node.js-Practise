var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app");// To connect to the database and if the cat_app is not in the database a new one will be connected.

// Defining a pattern for data.
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    species: String,
});

// Object for cat or catSchema.
var Cat = mongoose.model("Cat", catSchema);

// Assigning values to a george variable that holds the object
var george = new Cat({
    name: "Mrs. Norris",
    age: 4,
    temperament: "Evil"
});

// After the step above. The things will not be loaded or saved into the database.
// So we need this line to save the data.
// And also there is a possibility that the data won't save so a callback function is needed.
// george.save(function(err, cat){
//     if(err){
//         console.log("Error!! Data not saved");
//         console.log("Please check Your internet connection or database connection");
//     }
//     else{
//         console.log("Added : ");
//         console.log(cat);
//     }
// });

// This is another method for both creating and saving at the sametime.
// ### Prefered method ###

// Cat.create({
//    name: "Snow White",
//     age: 5,
//     temperament: "Good"
// }, function (err, saved) {
//     if(err){
//         console.log("Error!! Not inserted");
//     }
//     else{
//         console.log("Data inserted : " + "\n" + saved);
//     }
// });

// For displaying all the cats or datas.
Cat.find({}, function (err, cats) {  // We are passing in an empty object as we don't want to search one item.
    if(err){
        console.log(err);
    }
    else{
        console.log("Data found" + "\n" + cats);
    }
});