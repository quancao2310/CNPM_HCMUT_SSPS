const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const historyController = require('../controllers/HistoryController');

router.get('/customer', authenticate, historyController.getAllPrintHistoryByUser);
router.get('/spso', authenticate, historyController.getAllPrintHistoryBySPSO);
router.get('/:printID', authenticate, historyController.getPrintOrderDetailByID);

module.exports = router;