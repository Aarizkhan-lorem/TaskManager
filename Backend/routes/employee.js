const express = require('express');
const createEmployeeController = require('../controllers/createEmployeeController');
const loginEmployeeController = require('../controllers/loginEmployeeController');
const router = express.Router();

router.post("/createEmployee",createEmployeeController)
router.post("/loginEmployee" , loginEmployeeController )
module.exports = router;