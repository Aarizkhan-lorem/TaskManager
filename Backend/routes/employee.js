const express = require('express');
const createEmployeeController = require('../controllers/createEmployeeController');
const loginEmployeeController = require('../controllers/loginEmployeeController');
const verifyToken = require('../controllers/verifyToken');
const router = express.Router();

router.post("/createEmployee",createEmployeeController)
router.post("/loginEmployee" , loginEmployeeController )
router.post("/verify-token",verifyToken)
module.exports = router;