const express = require('express');
const router = express.Router();
const printController = require('../controllers/PrintController');
let path = require("path");

// const authenticate = require('../middlewares/authenticate');


// router.post('/confirm',authenticate, printController.addFileOrder);
// router.get('/status',authenticate, printController.showStatus);
// router.put('/minusPages',authenticate,printController.MinusPages);
// router.get('/getInfoPrinter',authenticate,printController.showInfoPrinter);

router.post('/confirm', printController.addFileOrder);
router.get('/status/:id', printController.showStatus);
router.put('/minusPages',printController.MinusPages);
router.get('/getInfoPrinter',printController.showInfoPrinter);

module.exports = router;