const mongoose= require('mongoose');
const Schema =mongoose.Schema;
const navigationSchema=new Schema({
    _id: String,
    building_name: String,
    lattitude: String,
    longitude: String,
    iconName: String
});

module.exports=mongoose.model('navigation',navigationSchema,'navigation')