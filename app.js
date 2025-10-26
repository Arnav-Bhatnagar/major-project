//server page
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const path = require("path");
const methodOverride=require("method-override");
const ejsmate=require("ejs-mate");

//for authentication(refer docs)
const passport = require("passport");
const LocalStrategy = require("passport-local");
//const User = require("./models/user.js");


//connecting database
const MONGO_URL= "mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
}



app.set("view engine","ejs");
app.set("views",path.join(__dirname ,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsmate);
app.use(express.static(path.join(__dirname,"/public")));  



//basic api
app.get("/",(req,res)=>{
    res.send("Hi iam root");
});

// we send get request to /listings and then we return all data that is all hotel names (index route)
app.get("/listings",async(req,res)=>{
    const allListings = await listing.find({});
    res.render("listings/index.ejs",{allListings});  
});

/**now we are creating New and Create route where get req goes on path /listings/new which gives us form on submiting that form the
   second request goes to create route(post route) that is on path /listings (to create a new listing)**/

//New Route
app.get("/listings/new",(req,res)=>{   //in response here we render a new form therefore for that in listing folder make new.ejs
    res.render("listings/new.ejs");    //create listing button press krte he req is sent to this /listing/new route, now we send its res
});
//we have putted new route code above show route so that code confuse naa ho ki it is listings/:id or new

//Show route
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    const listing_detail = await listing.findById(id);  //now we have to just parse this data in show.ejs(in listing folder only)
    res.render("listings/show.ejs",{listing_detail});
});

//Create route (here we accept our post req (after clicking add button))
app.post("/listings",async(req,res)=>{
    //let {title,description,image,price,country,location}=req.body;
    const newListing = new listing(req.body.listing);  //data is stored in key value pair therefor to parse it
    await newListing.save();
    res.redirect("/listings");
});

//for edit and update route we send get req to path /listings/:id/edit this render a form on submitting form put req send on path /listings/:id
//Edit Route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id} = req.params;
    const listing_detail = await listing.findById(id);
    res.render("listings/edit.ejs",{listing_detail});  //therefore konsi ejs file you show up on this req as resp comes first then some value like listing_details you want to send in listings/edit.ejs
});

//Update Route
app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await listing.findByIdAndUpdate(id, {...req.body.listing});  //req.body is our js object which contains all the parameters, by deconstructing(...) we convert those parameters into individual values and pass it to our new updated value
    res.redirect("/listings");
});

//reserve route
app.get("/listings/:id/reserve",async(req,res)=>{
    
    res.render("listings/reserve.ejs");  //therefore konsi ejs file you show up on this req as resp comes first then some value like listing_details you want to send in listings/edit.ejs
});


//delete route
app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    let deletedlisting = await listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    res.redirect("/listings");
});


/**app.get("/testlisting",async(req,res) => {
    let sampleListing = new listing({
        title:"my new villa",
        description:"by the beach",
        price:1200,
        location:"calangute,Goa",
        country:"India",
    });

    //to save above data
    await sampleListing.save();
    console,log("sample was saved");
    res.send("successfull testing");
 
});**/

//start the server at port 8080
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});


//we use another package of npm i.e ejs mate used to make layouts