const mongoose= require('mongoose');
const NewsSchema= mongoose.Schema;
const newsSchema=new NewsSchema({	
    id:Number,
    news_name:String,
    news_desc:String,
    news_date: String,
    access: String,
    imageURL: String,
    iconName: String
});

module.exports=mongoose.model('news',newsSchema,'news');