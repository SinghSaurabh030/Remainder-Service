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
        sendBasicEmail(
            'flightsbookingservices@gmail.com',
            'ss100200200@gmail.com',
            'dummy subject for test',
            'testing the nodemailer via smtp server of gmail'
        );
    });
}
setUpAndStartServer();