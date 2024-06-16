const express = require('express');
const router = express.Router();

const chargecontroller =require('../controllers/Charge/ChargeController');
router.post('/create-charge', chargecontroller.createCharge);
router.get('/get-charge-module', chargecontroller.createCharge);


module.exports = router;