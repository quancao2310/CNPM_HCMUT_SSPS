const express = require('express');
const router = express.Router();
const printerController = require('../controllers/PrinterController');

router.get('/', printerController.showAllPrinter);
router.post('/add', printerController.addPrinter);
router.put('/delete/:printer_id', printerController.deletePrinter);
router.get('/search',printerController.searchPrinter);
router.get('/getInfoPrinter/:printer_id',printerController.infoPrinter);
router.put('/edit/:printer_id', printerController.editPrinter);
router.put('/enable/:printer_id', printerController.enablePrinter);
router.put('/disable/:printer_id', printerController.disablePrinter);


module.exports = router;