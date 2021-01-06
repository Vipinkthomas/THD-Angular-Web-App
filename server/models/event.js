const mongoose= require('mongoose');
const EventSchema= mongoose.Schema;
const eventSchema=new EventSchema({
    id:Number,
    event_name_en:String,
    event_name_de:String,
    event_date: String,
    access: String,
	imageURL: String,
    iconName: String,
    createdby: String,
    event_desc_en:String,
    event_desc_de:String,
    numLike:Number,
    numShare:Number,
    numDisLike:Number
});

module.exports=mongoose.model('event',eventSchema,'event');
