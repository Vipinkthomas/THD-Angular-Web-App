const mongoose= require('mongoose');
const EventSchema= mongoose.Schema;
const eventSchema=new EventSchema({
    id:Number,
    event_name:String,
    event_desc:String,
    event_date: String,
    access: String,
    imageURL: String,
    iconName: String
});

module.exports=mongoose.model('event',eventSchema,'event');
