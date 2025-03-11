const jwt = require('jsonwebtoken');
require('dotenv').config();
const Employee = require("../models/employee");
exports.employeeDetails = async(req,res)=>{
    try{
        const  token  = req.headers.authorization?.split(' ')[1];
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        const employee = await Employee.findOne({_id:payload.id});
        employee.password = undefined;
        employee.name = employee.name.charAt(0).toUpperCase()+employee.name.slice(1);
        res.status(200).json({
            success:true,
            message:"Employee Fetched Successfully",
            data:employee
        });

    }catch(error){
        console.log(error.message)
        res.status(500).json({
            sucess:false,
            message:"Internal Server Error",
            error:error.message,
        })
    }
}