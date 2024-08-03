var cron = require('node-cron')
const { fetchPendingEmail, updateTicket } = require("../services/email-service");
const sender=require('../config/emailConfig');

const scheduleJob= ()=>{
    try {
        cron.schedule('*/1 * * * *', async () => {
            const response=await fetchPendingEmail();
            response.forEach((ticket) => {
                sender.sendMail({
                    to:ticket.recepientEmail,
                    subject:ticket.subject,
                    text:ticket.content
                },async (error,data)=>{
                    if(error){
                        console.log(error);
                    }
                    else{
                        console.log(data);
                        await updateTicket(ticket.id,{status:"SUCCESS"});
                    }
                });
                
            });
            console.log(response);
        });
        
    } catch (error) {
        console.log(error);
    }
}
module.exports=scheduleJob;