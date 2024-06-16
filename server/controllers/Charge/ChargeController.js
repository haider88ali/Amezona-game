// authController.js
const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const bcrypt = require('bcrypt');

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });
const router = express.Router();
const { db, executeQuery } = require('../../db/connection');
const Charge = require('../../models/Charge');
module.exports = {
  createCharge: async (req, res) => {
    upload.single('file')(req, res, async (err) => {
      try {
       

        const { social_link,userId } = req.body;

        // Check if Link with the same Link type already exists
        // const existingLink = await Link.findOne({ where: { social_type } });
        // if (existingLink) {
        //   return res.status(400).json({ message: 'Link Type already exists' });
        // }
        // Create a new charge
        const charge = await Charge.create({ social_link,userId });
        res.json({charge});
      } catch (error) {
        console.error('Charge Creation failed:', error);
        res.status(500).json({ message: 'Charge Creation failed. Please try again later.' });
      }
    });
  },
  getAllCharges: async (req, res) => {    
    try {
        const userId = req.params.userId;

    const charges = await Charge.findAll({where: { userId }}); 
    res.json({ message:"fetch  all Charges succsessfully",data:charges});
  } catch (error) {
    res.status(500).json({ message: 'Something went Wrong.' });
  }
  }
}
