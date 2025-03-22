const Task = require("../models/task");

exports.getTasks = async (req, res) => {
  try {
    const { id } = req.user;

    // Fetch tasks assigned to the logged-in user and exclude the password from assignedBy
    const response = await Task.find({ assignedTo: id }).populate(
      "assignedBy",
      "-password"
    );

    res.status(200).json({
      success: true,
      Tasks: response,
      message: "These are all Tasks",
    });
  } catch (error) {
    console.error("Error in getTasks:", error.message);
    res.status(500).json({
      success: false,
      Tasks: [],
      message: "Internal Server Error",
    });
  }
};
exports.getAllTasks = async(req,res)=>{
  try{
    const allTasks = await Task.find({}).populate('assignedBy assignedTo').exec();
    return res.status(200).json({
      success:true,
      message:`All Tasks Fetched Successfully!`,
      allTasks,
    })
  }catch(error){
    return res.status(500).json({
      success:false,
      message:`Error Fetching Tasks`,
      error:error.message
    })
  }
}
