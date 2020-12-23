const express= require('express')
const https = require('https');
const router =express.Router();
let urlDateTime = new Date().toISOString();
now = urlDateTime.substring(0, 10) + " " + urlDateTime.substring(11, 16);
let roomId=1;
const myUrl=`https://thabella.th-deg.de/thabella/opn/period/findByRoom/${roomId}/${now}`;
let body= "";
router.get('/',(req,res)=>{
    res.send('From API router');
});


/**
 * View Event
 */

https.get(myUrl,(res) => {

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let json = JSON.parse(body);
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
}); 
    
router.get('/thabella',(req,res)=>{
        res.status(200).send(body);
});



module.exports=router;