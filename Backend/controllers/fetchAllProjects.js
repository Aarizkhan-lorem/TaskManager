const Project = require('../models/project');

exports.fetchALlProjects = async(req,res) =>{
    try{
        const projects = await Project.find({}).populate('contributors').exec();
        res.status(200).json({
            success:true,
            projects:projects,
            message:'All Projects For Admin is Listed Here'
        })
    }catch(error){
        console.log(error.message);
        res.status(400).json({
            message:'internal Server Error'
        })
    }
}