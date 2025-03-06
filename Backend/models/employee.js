const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  username: {
    type: String,
    required: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    maxLength: 100,
  },
  role:{
    type:String,
    enum:["Admin","Employee"],
  }
});

module.exports= mongoose.model("Employee",employeeSchema);