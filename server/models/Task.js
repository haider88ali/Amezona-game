// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');
const User =require('../models/User');
const Task = sequelize.define('Task', {
  social_link: {
    type: DataTypes.STRING,
    allowNull: false
  },
  social_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  task_type: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true
  },
  rewards: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // The name of the referenced model
      key: 'id'   // The name of the referenced column
    }
  }
}, {
  // Disable timestamps
  timestamps: false
});

module.exports = Task;
