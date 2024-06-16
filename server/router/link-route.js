const express = require('express');
const router = express.Router();

const linkcontroller =require('../controllers/JoinLinks/LinkController');
router.post('/create-link', linkcontroller.createLink);
router.get('/links/:userId', linkcontroller.getAllLinks);
router.post('/update-link', linkcontroller.updateLink);
router.post('/delete-link/:linkId', linkcontroller.deleteLink);


module.exports = router;