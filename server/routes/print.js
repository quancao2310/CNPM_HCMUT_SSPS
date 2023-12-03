const express = require('express');
const router = express.Router();
const printController = require('../controllers/PrintController');
const SaveFileUpload = require('../controllers/UploadFile');
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
router.post('/uploadTemporaryFile',SaveFileUpload.SaveTemporaryFile);
router.post('/uploadPrintFile',SaveFileUpload.SavePrintFile);

module.exports = router;