const { response } = require("express");
const { createNotification } = require("../services/email-service");

const create=async (req,res)=>{
    try {
        const response=await createNotification(req.body);
        return res.status(201).json({
            success:true,
            data:response,
            err:{},
            message:'sucessfully registered remainder email'
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            data:response,
            err:error,
            message:'unable to register remainder email'
        });
    }
}
module.exports={
    create
}