const express = require('express');
const { setTask } = require('../controllers/setTask');
const { projectMiddleware } = require('../middlewares/projectMiddleware');
const { getTasks, getAllTasks } = require('../controllers/getTasks');
const { setTaskCompleted } = require('../controllers/setTaskCompleted');
const router = express.Router();

router.post('/setTask',projectMiddleware,setTask);
router.get('/getTasks',projectMiddleware,getTasks);
router.post('/setTaskCompleted',setTaskCompleted);
router.get("/getAllTasks", getAllTasks);
module.exports = router;