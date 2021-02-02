/**
 * news json model
 */
const mongoose= require('mongoose');
const NewsSchema= mongoose.Schema;
const newsSchema=new NewsSchema({	
    id:Number,
    news_name_en:String,
    news_name_de:String,
    news_date: String,
    access: String,
    imageURL: String,
    iconName: String,
    createdby: String,
    news_desc_en:String,
    news_desc_de:String,
    numLike:Number,
    numShare:Number,
    numDisLike:Number
});

module.exports=mongoose.model('news',newsSchema,'news');