const express= require('express');
const User= require('../models/user')
const Event= require('../models/event')
const News= require('../models/news')
const mongoose= require('mongoose');
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

const router =express.Router();


const db="mongodb+srv://uservipin:pwdvipin@cluster0.pzziq.mongodb.net/THD?retryWrites=true&w=majority";


mongoose.connect(db,err=>{
    if (err){
        console.error('Error!'+err);
    }
    else{
        console.log('Connected to MongoDB');
    }
});

router.get('/',(req,res)=>{
    res.send('From API router');
});

/**
 * Register
 */

router.post('/register',(req,res)=>{
    let userData= req.body;
    let user=new User(userData);
    user.save((error,registeredUser)=>{
        if (error){
            console.log(error);
        }
        else{
            res.status(200).send(registeredUser)
        }

    });

});

/**
 * Login
 */

router.post('/login',(req,res)=>{
    let userData=req.body;
    
    User.findOne({email:userData.email},(error,user)=>{

        if (error){
            console.log(error)
        }
        else{
            if(!user){
                res.status(401).send('Invalid Email');
            } 
            else
            if (user.password!==userData.password)
            {
                res.status(401).send('Invalid Password');

            }
            else{
                res.status(200).send(user);
            }
        }


    });


});

/**
 * Add Events
 */

router.post('/addevents',(req,res)=>{
    let eventData= req.body;
    let event=new Event(eventData);
    event.save((error,addedEvent)=>{
        if (error){
            console.log(error);
        }
        else{
            res.status(200).send(addedEvent)
        }

    });

});

/**
 * View Event
 */

router.post('/events',(req,res)=>{
    let eventData=req.body;
    
    Event.find({access:eventData.access},(error,event)=>{

        if (error){
            console.log(error)
        }
        else{
            if(!event){
                res.status(401).send('No Events');
            } 
            else{
                res.status(200).send(event);
            }
        }


    });


});

/**
 * Add News
 */

router.post('/addNews',(req,res)=>{
    let newsData= req.body;
    let news=new News(newsData);
    news.save((error,addedNews)=>{
        if (error){
            console.log(error);
        }
        else{
            res.status(200).send(addedNews)
        }

    });

});

/**
 * View News
 */

router.post('/news',(req,res)=>{
    let newsData=req.body;
    
    News.find({access:newsData.access},(error,news)=>{

        if (error){
            console.log(error)
        }
        else{
            if(!news){
                res.status(401).send('No News');
            } 
            else{
                res.status(200).send(news);
            }
        }


    });


});




module.exports=router;