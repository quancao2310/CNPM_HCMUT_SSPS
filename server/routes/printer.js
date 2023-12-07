const express = require('express');
const router = express.Router();
const printerController = require('../controllers/PrinterController');

router.get('/', printerController.showAllPrinter);
router.post('/add', printerController.addPrinter);
router.put('/det', printerController.deletePrinter);
router.get('/search',printerController.searchPrinter);
router.get('/getInfoPrinter',printerController.infoPrinter);
router.put('/edit', printerController.editPrinter);
router.put('/enable', printerController.enablePrinter);
router.put('/disable', printerController.disablePrinter);


module.exports = router;