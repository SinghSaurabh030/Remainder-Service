const express=require('express');
const { PORT } = require('./config/serverConfig');
const bodyParser = require('body-parser');
const { sendBasicEmail } = require('./services/email-service');
const scheduleJob = require('./utils/jobs');
const { create } = require('./controller/ticket-controller');
const app=express();

const setUpAndStartServer=()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.post('/api/v1/tickets',create);
    app.listen(PORT,()=>{
        console.log('connected');
        scheduleJob();
        
    });
}
setUpAndStartServer();