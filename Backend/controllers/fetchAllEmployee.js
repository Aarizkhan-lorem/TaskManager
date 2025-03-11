const Employee = require('../models/employee');

exports.fetchAllEmployee = async(req,res) =>{
    try{
            const employees = await Employee.find({});
            //employees  is an ARRAY not an object
            employees.forEach((employee) => {
              employee.password = undefined;
            });
            res.status(200).json({
              success: true,
              data: employees,
              message: "All Employees data fetched successfully!",
            });
    }catch(error){
        res.status(200).json({
          success: false,
          data:error.message,
          message: "Internal Server Error",
        });
    }
}