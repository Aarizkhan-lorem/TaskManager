const Tasks = require('../models/task');

exports.setTaskCompleted = async(req,res)=>{
    try{
        const {id} = req.body;
        const response = await Tasks.findByIdAndUpdate(id,{status:'completed',completedOn:Date.now()},{new:true});
        res.status(200).json({
            success:true,
            Task:response,
            message:'Task Set As Completed'
        })
    }catch(error){
        console.log(error.message);
        res.status(200).json({
            success:false,
            Task:"Internal Server Error",
            message:error.message
        })
    }
}