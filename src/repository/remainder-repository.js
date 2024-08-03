const {  Op, where } = require("sequelize");
const {NotificationTicket}=require("../models/index");

class RemainderRepository{
     getAll=async ()=>{
        try {
            const response=await NotificationTicket.findAll();
            return response;
        } catch (error) {
            throw error;
        }
    }
    create=async (data)=>{
        try {
            const ticket=await NotificationTicket.create(data);
            return ticket;
        } catch (error) {
            throw error;
        }
    }
    get=async (filter)=>{
        try {
            const tickets=await NotificationTicket.findAll({
                where:{
                    status:filter.status,
                    notificationTime:{
                        [Op.lte] : new Date()
                    }
                }
            });
            return tickets;
        } catch (error) {
            throw error;
        }
    }
    update=async (ticketId,data)=>{
        try {
            await NotificationTicket.update(data,{
                where:{
                    id:ticketId
                }
            });
            return true;
        } catch (error) {
            throw error;
        }
    }
}
module.exports=RemainderRepository;