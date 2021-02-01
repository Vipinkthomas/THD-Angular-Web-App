const express= require('express')
const bcrypt = require('bcrypt')
const User= require('../models/user')
const Event= require('../models/event')
const News= require('../models/news')
const Navigation= require('../models/navigation')
const mongoose= require('mongoose')
const jwt=require('jsonwebtoken')

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

const router =express.Router();

/**
 * Cloud Mongodb connection
 */

// const db="mongodb+srv://uservipin:pwdvipin@cluster0.pzziq.mongodb.net/THD?retryWrites=true&w=majority";


// mongoose.connect(db,err=>{
//     if (err){
//         console.error('Error!'+err);
//     }
//     else{
//         console.log('Connected to MongoDB');
//     }
// });



/**
 * local Mongodb connection
 */

const db="mongodb://localhost:27017/"

mongoose.connect(db,{
    dbName: 'THD',
    useNewUrlParser: true,
    useUnifiedTopology: true 
},err=>{
    if (err){
        console.error('Error!'+err);
    }
    else{
        console.log('Connected to MongoDB');
    }
});



function verifyToken(req,res,next){

    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    
    let token=req.headers.authorization.split(' ')[1]
    if(token=='null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload=jwt.verify(token,'secretKey')
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId=payload.subject
    next()



}

router.get('/',(req,res)=>{
    res.send('From API router');
});

/**
 * Register
 */

router.post('/register',(req,res)=>{
    let userData= req.body;
    User.findOne({email:userData.email},(error,user)=>{

        if (error){
            console.log(error)
        }
        else{
            if(!user){
                userData.password=bcrypt.hashSync(userData.password,10)
                let user=new User(userData);
                user.save((error,registeredUser)=>{
                if (error){
                    console.log(error);
                }
                else{
                let payload={subject:registeredUser._id}
                let token=jwt.sign(payload,'secretKey')
                res.status(200).send({token})
                }
                });
            } 
            else{
                console.log('email is present')
            }
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
            
            else if(bcrypt.compareSync(userData.password,user.password))
                {
                
                let role=user.role
                let payload={ subject: user._id}
                let token=jwt.sign(payload,'secretKey')
                res.status(200).send({token,role});
            }
            else
            {
                res.status(401).send('Invalid Password');

            }
        }


    });


});

/**
 * Add Events
 */

router.post('/addevents',verifyToken,(req,res)=>{
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
 * Update Events
 */

router.post('/updateevents',(req,res)=>{
    let eventData= req.body.UpdateEvent;
    let event=new Event(eventData);
    let id=req.body._id;
    Event.updateOne({"_id":id},{$set:event},(error,updatedEvent)=>{
        if (error){
            console.log(error);
        }
        else{
            res.status(200).send(updatedEvent)
        }

    });

});

/**
 * Delete Events
 */

router.post('/deleteevents',verifyToken,(req,res)=>{
    let id= req.body
    Event.deleteOne(id,(error,deletedEvent)=>{
        if (error){
            console.log(error);
        }
        else{
            res.status(200).send(deletedEvent)
        }

    });

});

/**
 * View Event
 */

router.get('/events',verifyToken,(req,res)=>{
    let eventData=req.body;
    Event.find(eventData,(error,event)=>{

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
 * View Public Event
 */

router.get('/publicevents',(req,res)=>{  
    let eventData={"access":"public"}
    Event.find(eventData,(error,event)=>{

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

router.post('/addnews',verifyToken,(req,res)=>{
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

router.get('/news',verifyToken,(req,res)=>{
    let newsData=req.body;
    
    News.find(newsData,(error,news)=>{

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

/**
 * View public News
 */

router.get('/publicnews',(req,res)=>{
    let newsData={"access":"public"}
    News.find(newsData,(error,news)=>{

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


/**
 * Update News
 */

router.post('/updatenews',(req,res)=>{
    let newsData= req.body.UpdateNews;
    let news=new News(newsData);
    let id=req.body._id;
    News.updateOne({"_id":id},{$set:news},(error,updatedNews)=>{
        if (error){
            console.log(error);
        }
        else{
            res.status(200).send(updatedNews)
        }

    });

});

/**
 * Delete News
 */

router.post('/deletenews',verifyToken,(req,res)=>{
    let id= req.body
    News.deleteOne(id,(error,deletedNews)=>{
        if (error){
            console.log(error);
        }
        else{
            res.status(200).send(deletedNews)
        }

    });

});



/**
 * Navigation
 */

router.get('/navigation',verifyToken,(req,res)=>{
    
    Navigation.find({},(error,navigation)=>{

        if (error){
            console.log(error)
        }
        else{
            if(!navigation){
                res.status(401).send('No Data');
            } 
            else{
                res.status(200).send(navigation);
            }
        }


    })
});


/**
 * Delete Navigation
 */

router.post('/deletenav',verifyToken,(req,res)=>{
    let id= req.body
    Navigation.deleteOne(id,(error,deletedNav)=>{
        if (error){
            console.log(error);
        }
        else{
            res.status(200).send(deletedNav)
        }

    });

});

/**
 * Update Navigation
 */

router.post('/updatenav',(req,res)=>{
    let navData= req.body.UpdateNav;
    let nav=new Navigation(navData);
    let id=req.body._id;
    console.log(id,nav)
    Navigation.updateOne({"_id":id},{$set:nav},(error,updatedNav)=>{
        if (error){
            console.log(error);
        }
        else{
            console.log(updatedNav)
            res.status(200).send(updatedNav)
        }

    });

});

/**
 * Add Navigation
 */

router.post('/addnav',verifyToken,(req,res)=>{
    let navData= req.body;
    let nav=new Navigation(navData);
    nav.save((error,addedNav)=>{
        if (error){
            console.log(error);
        }
        else{
            res.status(200).send(addedNav)
        }

    });

});



module.exports=router;