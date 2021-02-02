/**
 * to set up the express framework and cors
 */

const cors = require('cors'); 
const express = require('express');

/**
 * parses the body of the requests coming from the front end
 */
const bodyParser= require('body-parser');

/**
 * Server port
 */

const PORT =3000;
const api=require('./routes/api');

/**
 * Express object used to set up the application
 */

const app=express();
app.use(cors());

/**
 * to handle json data
 */

app.use(bodyParser.json());
app.use('/api',api);

/**
 * get request
 */

app.get('/',function(req,res){
    res.send('Hello from the server');
});

app.listen(PORT,function(){
    console.log('Server Runnning on localhost'+ PORT);    
})

