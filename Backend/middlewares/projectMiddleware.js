const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.projectMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token found",
      });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if(!payload){
        return res.status(401).json({
          success: false,
          message: "Invalid Token!",
        });
    }
    req.user = payload; 
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid token",
      error: error.message,
    });
  }
};
