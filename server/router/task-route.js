const express = require('express');
const router = express.Router();
const verifyToken = require('../Middleware/verifyToken');

const taskcontroller =require('../controllers/Tasks/TaskController');
router.post('/create-task', taskcontroller.createTask);
router.get('/tasks/:userId', taskcontroller.getAllTasks);
router.post('/update-task', taskcontroller.updateTask);
router.post('/delete-task/:taskId', taskcontroller.deleteTask);


module.exports = router;