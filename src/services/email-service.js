const sender=require('../config/emailConfig');
const RemainderRepository = require('../repository/remainder-repository');
const repo=new RemainderRepository();
const sendBasicEmail=(mailFrom,mailTo,mailSubject,mailBody)=>{
    try {
        sender.sendMail({
            from:mailFrom,
            to:mailTo,
            subject:mailSubject,
            text:mailBody
        });
    } catch (error) {
        console.log(error);
    }
}
const fetchPendingEmail=async ()=>{
    try {
        const response=await repo.get({status:"PENDING"});
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
const createNotification=async (data)=>{
    try {
        const response=await repo.create(data);
        console.log('called create');
        return response
    } catch (error) {
        console.log(error);
        throw error;
    }
}
const updateTicket=async (ticketId,data)=>{
    try {
        
        await repo.update(ticketId,data);
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
const subscribeEvents=async (payload)=>{
    try {
        const service=payload.type;
        const data=payload.data;
        if(service=="NOTIFICATION"){
            console.log(data);
           await createNotification(data);
        }
        else{
            console.log('invalid request',payload);
        }
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports={
    sendBasicEmail,
    fetchPendingEmail,
    createNotification,
    updateTicket,
    subscribeEvents
}