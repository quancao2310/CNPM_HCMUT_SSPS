const express = require('express');
const router = express.Router();
const loginController = require('../controllers/LoginController');

router.post('/customer', loginController.loginCustomer);
router.post('/spso', loginController.loginSPSO);

module.exports = router;