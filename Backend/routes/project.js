
const express = require('express');
const { createProject } = require('../controllers/createProjectController');
const { projectMiddleware } = require('../middlewares/projectMiddleware');
const { fetchProjectOfEmployee } = require('../controllers/fetchProjectOfEmployee');
const { setProjectCompleted } = require('../controllers/setProjectCompleted');
const {fetchCompletedProject} = require('../controllers/fetchCompletedProject')
const router = express.Router();

router.post('/createProject',projectMiddleware,createProject);
router.get("/fetchEmployeeProjects", projectMiddleware , fetchProjectOfEmployee );
router.post("/setProjectCompleted", setProjectCompleted);
router.get("/fetchCompletedProject", projectMiddleware, fetchCompletedProject);

module.exports = router;