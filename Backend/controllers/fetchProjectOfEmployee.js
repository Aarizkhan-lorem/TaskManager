const Project = require('../models/project');

exports.fetchProjectOfEmployee = async(req,res)=>{
    try{
            const id = req.user.id;
            const projects = await Project.find({
              contributors: { $in: [id] },
              status:'pending'
            }).populate('contributors createdBy');
            if (projects.length===0) {
              return res.status(200).json({
                success: true,
                projects: [],
                message: "No projects found",
              });
            }
            return res.status(200).json({
              success: true,
              projects: projects,
              message: "These are all projects",
            });
    }catch(error){
        return res.status(500).json({
          success: false,
          error:error.message,
          message: "Server Error",
        });
    }

}