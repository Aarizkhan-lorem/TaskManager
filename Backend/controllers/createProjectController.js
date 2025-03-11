const Project = require('../models/project');

exports.createProject = async(req,res) =>{
    try{
      // console.log(payload);
      const payload = req.user;
      console.log(payload);
      const createdBy = payload.id;
      const { title, description, deadline, contributors } = req.body;

      const project = await Project.create({
        title,
        description,
        deadline,
        createdBy,
        contributors,
      });
      console.log(project);
      res.status(200).json({
        success: true,
        data: project,
        message: "Project Created Successfully!!",
      });
    }catch(error){
        console.log(error.message)
                res.status(500).json({
                  success: false,
                  error: error.message,
                  message: "Internal Server Error!!",
                });
    }
}