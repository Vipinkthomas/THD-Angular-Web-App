const express= require('express')
const https = require('https');
const router =express.Router();

const myUrl="https://thabella.th-deg.de/thabella/opn/period/findByRoom/1/2020-12-22%2008:52";

router.get('/',(req,res)=>{
    res.send('From API router');
});


/**
 * View Event
 */

router.post('/thabella',(req,res)=>{
    https.get(myUrl,(res) => {
      
          if(res[0]){
          res.status(200).send(res[0]);
          console.log(res);
          }
          else{
            console.log('no items')
          }
        });


});



module.exports=router;