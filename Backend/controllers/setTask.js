const Task = require("../models/task");

exports.setTask = async (req, res) => {
  try {
    const { id } = req.user;
    // console.log(req.user);
    // console.log(id);

    const { task, priority, assignedTo, deadline } = req.body;

    const newTask = await Task.create({
      task,
      priority,
      assignedTo,
      deadline,
      assignedBy: id,
    });

    const response = await Task.findById(newTask._id)
      .populate("assignedTo", "-password")
      .populate("assignedBy", "-password");

    res.status(200).json({
      success: true,
      data: response,
      message: "Task Assigned Successfully!",
    });
  } catch (error) {
    console.error("Error in setTask:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
