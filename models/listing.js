//first model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;    //so we dont write mongoose.schema again and again
const listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        filename :
        {type:String},
        url:{type:String}
    
        
        //set: (v) => v === ""
           // ? "deafult link"
           // : v,   //seting default image to be shown that is image is comming but not able to show(add link of image in place of default link)
        
        
    },
    price:Number,
    location:String,
    country:String,
});

//now using above schema we create our model
const listing = mongoose.model("listing",listingSchema);  //now we export this listing model in app.js
module.exports = listing;


