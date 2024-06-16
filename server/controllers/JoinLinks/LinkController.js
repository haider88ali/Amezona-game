// authController.js
const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const bcrypt = require('bcrypt');

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });
const Link = require('../../models/Link');
const router = express.Router();
const { db, executeQuery } = require('../../db/connection')
module.exports = {
  createLink: async (req, res) => {
    upload.single('file')(req, res, async (err) => {
      try {
       

        const { social_link,social_type, task_type, rewards,userId } = req.body;

        // Check if Link with the same Link type already exists
        // const existingLink = await Link.findOne({ where: { social_type } });
        // if (existingLink) {
        //   return res.status(400).json({ message: 'Link Type already exists' });
        // }
        // Create a new Link
        const link = await Link.create({ social_link,social_type, task_type, rewards,userId });
        res.json({link});
      } catch (error) {
        console.error('Link Creation failed:', error);
        res.status(500).json({ message: 'Link Creation failed. Please try again later.' });
      }
    });
  },
  updateLink: async (req, res) => {
    upload.single('file')(req, res, async (err) => {
      try {
        // Extract data from the request body
        const { linkId, social_link, social_type, task_type, rewards,userId } = req.body;
  
        // Check if the Link exists
        const existingLink = await Link.findByPk(linkId);
        if (!existingLink) {
          return res.status(404).json({ message: 'Link not found' });
        }
  
        // Update the Link with the new data
        await existingLink.update({ social_link, social_type, task_type, rewards,userId });
  
        res.json({ message: 'Link updated successfully', Link: existingLink });
      } catch (error) {
        console.error('Link Update failed:', error);
        res.status(500).json({ message: 'Link Update failed. Please try again later.' });
      }
    });
  },
  deleteLink: async (req, res) => {
    try {
      const LinkId = req.params.linkId;
  
      // Check if the Link exists
      const existingLink = await Link.findByPk(LinkId);
      if (!existingLink) {
        return res.status(404).json({ message: 'Link not found' });
      }
  
      // Delete the Link
      await existingLink.destroy();
  
      res.json({ message: 'Link deleted successfully' });
    } catch (error) {
      console.error('Link Deletion failed:', error);
      res.status(500).json({ message: 'Link Deletion failed. Please try again later.' });
    }
  },
  getAllLinks: async (req, res) => {
    try {
        const userId = req.params.userId;

    const Links = await Link.findAll({where: { userId }}); 
    res.json({ message:"fetch  all Links succsessfully",data:Links});
  } catch (error) {
    res.status(500).json({ message: 'Something went Wrong.' });
  }
  }
}
