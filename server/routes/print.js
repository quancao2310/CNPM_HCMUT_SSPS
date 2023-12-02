const express = require('express');
const router = express.Router();
const printController = require('../controllers/PrintController');

router.post('/confirm',printController.addFileOrder);
router.get('/status',printController.showStatus);
router.put('/minusPages',printController.MinusPages);

module.exports = router;