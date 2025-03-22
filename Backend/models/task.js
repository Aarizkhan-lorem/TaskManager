const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  deadline: {
    type: Date,
  },
  completedOn:{
    type:Date,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
});
module.exports = mongoose.model('Task',taskSchema);