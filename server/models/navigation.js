/**
 * navigation json model
 */
const mongoose= require('mongoose');
const Schema =mongoose.Schema;
const navigationSchema=new Schema({
    building_name: String,
    lattitude: String,
    longitude: String,
    iconName: String
});

module.exports=mongoose.model('navigation',navigationSchema,'navigation')