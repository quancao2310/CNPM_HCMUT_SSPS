const express = require('express');
const router = express.Router();
const printController = require('../controllers/PrintController');
const authenticate = require('../middlewares/authenticate');

router.post('/confirm',authenticate, printController.addFileOrder);
router.get('/status',authenticate, printController.showStatus);
router.put('/minusPages',authenticate,printController.MinusPages);

module.exports = router;