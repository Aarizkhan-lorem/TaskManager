const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
router.post("/createAdmin", async(req,res) =>{
    try{
        const { name, username, password } = req.body;
        const response = await Admin.create({ name, username, password });
        res.status(200).json({
          success: true,
          message: "Admin Created Successfully!!",
          data: response,
        });
    }catch(error){
        res.status(500).json({
          success: false,
          message: "Internal Server Error !",
          data:error.message,
        });
    }
} );

router.post('/loginAdmin',async(req,res)=>{
    try {
      const {username, password } = req.body;
      const admin = await Admin.findOne({username});
      if(!admin){
        return res.status(401).json({
          success: false,
          message: "Please Enter Valid Credentials",
        });
      }
      if(admin.password != password){
        return res.status(401).json({
          success: false,
          message: "Password Is Incorrect!",
        });
      }
      admin.password= undefined;
      let token = jwt.sign(
                      { username: admin.username, id: admin._id },
                      process.env.JWT_SECRET,
                      { expiresIn: "2h" });
      res.status(200).json({
        token,
        success: true,
        message: "Logged in as Admin",
        data: admin,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error !",
        data: error.message,
      });
    }

})

module.exports = router;