// authController.js
const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const bcrypt = require('bcrypt');

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });
const User = require('../../models/User');
const router = express.Router();
const { db, executeQuery } = require('../../db/connection')
module.exports = {
  register: async (req, res) => {
    upload.single('file')(req, res, async (err) => {
      try {
       

        const { firstname,lastname, email, password } = req.body;
        // Check if user with the same email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await User.create({ firstname,lastname, email, password: hashedPassword });

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });

        res.json({ token, user });
      } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ message: 'Registration failed. Please try again later.' });
      }
    });
  },

  login: async (req, res) => {
    upload.single('file')(req, res, async (err) => {
      try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }
        console.log(password);
        // Compare passwords
        const verify_password = await bcrypt.compare(req.query.password,user.password);

        const validPassword = await  bcrypt.compare(password, user.password);
        if (validPassword) {
          // Generate JWT token
          const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });

          res.json({ message: 'Login successful', token, user });
        } else {
          return res.status(401).json({ message: 'Authentication failed. Invalid password.' });
        }
      
      } catch (error) {
        console.error('Login failed:', error);
        res.status(500).json({ message: 'Login failed. Please try again later.' });
      }
    });
  },
  getAllUsers: async (req, res) => {
    try {
    const users = await User.findAll(); 
    res.json({ message:"fetch succsessfully",data:users});
  } catch (error) {
    res.status(500).json({ message: 'Something went Wrong.' });
  }
  },
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;
  
      // Check if the Link exists
      const existingUser = await User.findByPk(id);
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Delete the Link
      await existingUser.destroy();
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('User Deletion failed:', error);
      res.status(500).json({ message: 'User Deletion failed. Please try again later.' });
    }
  }
}
