/**
 * user json model
 */
const mongoose= require('mongoose');
const Schema =mongoose.Schema;
const userSchema=new Schema({
    email: String,
    password: String,
    role: String
});

module.exports=mongoose.model('user',userSchema,'user')