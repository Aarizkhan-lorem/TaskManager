const Employee = require("../models/employee");
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const loginEmployeeController = async(req , res) =>{
    try{
            const { username, password } = req.body;
            if (!username || !password) {
              return res.status(400).json({
                success: false,
                message: "Please Provide the Email And Password",
              });
            }
            const employee = await Employee.findOne({ username }).lean();
            if (!employee) {
              return res.status(401).json({
                sucess: false,
                message: "Enter A Valid Username",
              });
            }

            if (await bcrypt.compare(password, employee.password)) {
              let token = jwt.sign(
                { username: employee.username, id: employee._id ,name:employee.name},
                process.env.JWT_SECRET,
                { expiresIn: "2h" }
              );
              employee.token = token;
              employee.password = undefined;
              res.status(200).json({
                success: true,
                token,
                employee,
                message: "User Logged In",
              });
            } else {
              return res.status(403).json({
                success: false,
                message: "Your Password is Incorrect",
              });
            }
    }catch(error){
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "Login Failure",
        });
    }
    
    
}
module.exports = loginEmployeeController