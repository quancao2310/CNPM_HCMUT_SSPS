const express = require('express');
const router = express.Router();
const historyController = require('../controllers/HistoryController');
const authenticate=require('../middlewares/authenticate')

router.get('/customer', authenticate, historyController.historyCustomer);
router.get('/customer/detail', authenticate, historyController.historyCustomerByPrintOderID);
router.get('/spso', authenticate, historyController.historySPSO);
router.get('/spso/detail', authenticate, historyController.historyByUserId);


module.exports = router;