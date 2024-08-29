const express=require('express');
const { PORT, REMAINDER_BINDING_KEY } = require('./config/serverConfig');
const bodyParser = require('body-parser');
const { sendBasicEmail, subscribeEvents } = require('./services/email-service');
const scheduleJob = require('./utils/jobs');
const { create } = require('./controller/ticket-controller');
const { createChannel, subscribeMessage } = require('./utils/messageQueue');
const app=express();


const setUpAndStartServer=async ()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.post('/api/v1/tickets',create);
    const channel= await createChannel();
    subscribeMessage(channel,subscribeEvents,REMAINDER_BINDING_KEY);
    app.listen(PORT,()=>{
        console.log('connected');
        scheduleJob();
        
    });
}
setUpAndStartServer();