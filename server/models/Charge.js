// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');
const User =require('./User');
const Charge = sequelize.define('Link', {
  social_link: {
    type: DataTypes.STRING,
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

module.exports = Charge ;
