const mongoose = require("mongoose");
const initdata=require("./data.js");
const listing=require("../models/listing.js");

const MONGO_URL= "mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB=async()=>{
    await listing.deleteMany({})  //first we delete data present in dbs
    await listing.insertMany(initdata.data); //now we insert our data
    //we know in data.js initdata is an object where we have to access key data
    console.log("data was initialized");


}

initDB();  //calling initdb() fxn.