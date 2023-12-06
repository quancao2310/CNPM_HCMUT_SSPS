const express = require('express');
const router = express.Router();
const printController = require('../controllers/PrinterController');
const authenticate = require('../middlewares/authenticate');

// router.post('/confirm',authenticate, printController.addFileOrder);
// router.get('/status',authenticate, printController.showStatus);
// router.put('/minusPages',authenticate,printController.MinusPages);
// router.get('/getInfoPrinter',authenticate,printController.showInfoPrinter);

router.post('/add', printerController.addPrinter);
router.get('/det', printerController.deletePrinter);
router.put('/minusPages',printerController.searchPrinter);
router.get('/getInfoPrinter',printerController.infoPrinter);
router.get('/status', printerController.editPrinter);
router.get('/status', printerController.enablePrinter);
router.get('/status', printerController.disablePrinter);


module.exports = router;