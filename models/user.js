const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
mail:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
date:{
    type:Date,
    default:Date.now
}

});

const User = mongoose.Schema('User',UserSchema)

module.exports = User;