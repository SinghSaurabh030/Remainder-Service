const express=require('express');
const { PORT } = require('./config/serverConfig');
const bodyParser = require('body-parser');
const { sendBasicEmail } = require('./services/email-service');
const app=express();

const setUpAndStartServer=()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.listen(PORT,()=>{
        console.log('connected');
        
    });
}
setUpAndStartServer();