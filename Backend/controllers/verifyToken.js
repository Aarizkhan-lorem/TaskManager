const jwt = require('jsonwebtoken')
require('dotenv').config();
const verifyToken = async(req,res)=>{
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.json({ valid: false });

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.json({ valid: false });
        return res.json({ valid: true });
      });
}
module.exports = verifyToken;