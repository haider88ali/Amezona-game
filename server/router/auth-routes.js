const express = require('express');
const router = express.Router();
const authcontroller =require('../controllers/Auth/AuthController');
router.post('/register', authcontroller.register);
router.post('/login', authcontroller.login);
router.get('/users',authcontroller.getAllUsers);
router.post('/user:id',authcontroller.deleteUser);
module.exports = router;