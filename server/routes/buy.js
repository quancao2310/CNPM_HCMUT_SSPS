const express = require('express');
const router = express.Router();
const buyController = require('../controllers/BuyController');
// const authenticate = require('../middlewares/authenticate');

// router.put('/buyPages',authenticate,buyController.AddPages);

// Chưa liên kết với authenticate
router.put('/buyPages',buyController.AddPages);

module.exports = router;