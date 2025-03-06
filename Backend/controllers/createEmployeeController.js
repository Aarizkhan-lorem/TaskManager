const Employee = require("../models/employee");
const bcrypt = require('bcrypt');
const createEmployeeController = async(req,res) =>{
    try{
        let hashedPassword;
        const {name , username ,role, password} = req.body;
        const existingUser = await Employee.findOne({username})
        if(existingUser){
            return res.status(400).json({
                success:false,
                data: "User Already Exist",
                message:"User Already Registered",
            })
        }
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err){
            return res.status(500).json({
              success: false,
              message: "Try Again Later!",
            });
        }
        const response = await Employee.create({name , username ,password:hashedPassword , role});
        res.status(200).json({
            success:true,
            data:response,
            message:"Employee Created Successfully!!",
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({
          success: false,
          data: "Error",
          message: err.message,
        });
    }
}

module.exports = createEmployeeController;