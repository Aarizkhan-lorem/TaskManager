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
  role: {
    type: String,
    required: true,
    maxLength: 50,
  },
  token: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  profileImage:{
    type:String,
  }
});

module.exports= mongoose.model("Employee",employeeSchema);