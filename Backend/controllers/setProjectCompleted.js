const Model = require('../models/project');

module.exports.setProjectCompleted = async(req,res) =>{
    try{
        const {id} = req.body;
        const response = await Model.findByIdAndUpdate(id ,{status:"completed" , completedAt:Date.now()} ,{new:true});
        console.log(response);
        res.status(200).json({
            success:true,
            data: response,
            message:"Project set as completed"
        })
    }catch(error){
        res.status(400).json({
            success:false,
            data: "Internal Server Error",
        })
        console.log(error.message);
    }
}