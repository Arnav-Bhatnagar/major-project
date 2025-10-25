//model for user database (login signup etc)

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");  //you can see in passport docs this we gave to write(mongoose plugin for passport local stratergy)

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    }

});

User.plugin(passportLocalMongoose);  //we are adding passport local mongoose as plugin to user schema (so that we can use its methods like register , authenticate etc)

//this passport plugin above automatically adds password field with salting hashing etc so no need to write all that .


module.exports = mongoose.model("User",userSchema);

    
