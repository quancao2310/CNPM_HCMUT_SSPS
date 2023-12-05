const express = require('express');
const router = express.Router();
const reportController = require('../controllers/ReportController');
// const authenticate=require('../middlewares/authenticate')

// router.get('/getReport', authenticate,reportController.GetReport);
router.get('/getReport', reportController.GetReport);
router.get('/getFirstOrder', reportController.GetReportFirst)

module.exports = router;