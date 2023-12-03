const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate')
const userController = require('../controllers/UserController');

router.post('/login/customer', userController.loginCustomer);
router.post('/login/spso', userController.loginSPSO);
router.get('/', authenticate, userController.getUserByID);

module.exports = router;