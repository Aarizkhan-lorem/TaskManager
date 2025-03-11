const express = require('express');
const createEmployeeController = require('../controllers/createEmployeeController');
const loginEmployeeController = require('../controllers/loginEmployeeController');
const verifyToken = require('../controllers/verifyToken');
const { employeeDetails } = require('../controllers/employeeDetails');
const { fetchAllEmployee } = require('../controllers/fetchAllEmployee');
const router = express.Router();

router.post( "/createEmployee", createEmployeeController )
router.post( "/loginEmployee" , loginEmployeeController )
router.post( "/verify-token", verifyToken )
router.get('/employee-dashboard', employeeDetails )
router.get('/allEmployees', fetchAllEmployee )
module.exports = router ;