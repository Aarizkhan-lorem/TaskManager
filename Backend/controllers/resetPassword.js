const Employee = require("../models/employee");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { body, validationResult } = require("express-validator"); // Validation library
exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;
    const employee = await Employee.findOne({ username: email });
    if (!employee) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
      });
    }

    const token = crypto.randomBytes(20).toString("hex");

    const updatedDetails = await Employee.findOneAndUpdate(
      { username: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
      { new: true }
    );
    console.log("DETAILS", updatedDetails);

    const url = `http://localhost:5173/update-password/${token}`;

    await mailSender(
      email,
      "Password Reset",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );

    res.json({
      success: true,
      message:
        "Email Sent Successfully, Please Check Your Email to Continue Further",
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Sending the Reset Message`,
    });
  }
};

exports.resetPassword = async (req, res) => {
    // Input validation
    await Promise.all([
      // body("name").trim().notEmpty().withMessage("Name is required").run(req),
      // body("username")
      //   .trim()
      //   .notEmpty()
      //   .withMessage("Username is required")
      //   .isAlphanumeric()
        // .withMessage("Username must be alphanumeric")
        // .run(req),
      // body("role")
      //   .notEmpty()
      //   .withMessage("Role is required")
      // //   .isIn(["employee", "manager"])
      //   .withMessage("Invalid role")
      //   .run(req),
      body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")
        .run(req),
    ]);
  
    // Get validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
  try {
    const { password, confirmPassword, token } = req.body;
    if(!password || !confirmPassword){
      return res.status(400).json({
        success:false,
        message:`All Fields Are Required!`
      })
    }
    if (confirmPassword !== password) {
      return res.json({
        success: false,
        message: "Password and Confirm Password Does not Match",
      });
    }
    const employeeDetails = await Employee.findOne({ token: token });
    if (!employeeDetails) {
      return res.status(401).json({
        success: false,
        message: "Token is Invalid",
      });
    }
    if (!(employeeDetails.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        error: `Token is Expired, Please Regenerate Your Token`,
        message:`Reset Password Link Expired!`
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    await Employee.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword },
      { new: true }
    );
    res.json({
      success: true,
      message: `Password Reset Successful`,
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Updating the Password`,
    });
  }
};
