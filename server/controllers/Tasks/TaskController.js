// authController.js
const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const bcrypt = require('bcrypt');

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });
const Task = require('../../models/Task');
const router = express.Router();
const { db, executeQuery } = require('../../db/connection')
module.exports = {
  createTask: async (req, res) => {
    upload.single('file')(req, res, async (err) => {
      try {
       

        const { social_link,social_type, task_type, rewards,userId } = req.body;

        // Check if task with the same task type already exists
        // const existingTask = await Task.findOne({ where: { social_type } });
        // if (existingTask) {
        //   return res.status(400).json({ message: 'Task Type already exists' });
        // }
        // Create a new Task
        const task = await Task.create({ social_link,social_type, task_type, rewards,userId });
        res.json({task});
      } catch (error) {
        console.error('Task Creation failed:', error);
        res.status(500).json({ message: 'Task Creation failed. Please try again later.' });
      }
    });
  },
  updateTask: async (req, res) => {
    upload.single('file')(req, res, async (err) => {
      try {
        // Extract data from the request body
        const { taskId, social_link, social_type, task_type, rewards,userId } = req.body;
  
        // Check if the task exists
        const existingTask = await Task.findByPk(taskId);
        if (!existingTask) {
          return res.status(404).json({ message: 'Task not found' });
        }
  
        // Update the task with the new data
        await existingTask.update({ social_link, social_type, task_type, rewards,userId });
  
        res.json({ message: 'Task updated successfully', task: existingTask });
      } catch (error) {
        console.error('Task Update failed:', error);
        res.status(500).json({ message: 'Task Update failed. Please try again later.' });
      }
    });
  },
  deleteTask: async (req, res) => {
    try {
      const taskId = req.params.taskId;
  
      // Check if the task exists
      const existingTask = await Task.findByPk(taskId);
      if (!existingTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // Delete the task
      await existingTask.destroy();
  
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Task Deletion failed:', error);
      res.status(500).json({ message: 'Task Deletion failed. Please try again later.' });
    }
  },
  getAllTasks: async (req, res) => {
    try {
        const userId = req.params.userId;

    const tasks = await Task.findAll({where: { userId }}); 
    res.json({ message:"fetch  all tasks succsessfully",data:tasks});
  } catch (error) {
    res.status(500).json({ message: 'Something went Wrong.' });
  }
  }
}
