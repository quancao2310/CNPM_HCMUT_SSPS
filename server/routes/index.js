const express = require('express');
const user = require('./user');
const history = require('./history');
const print = require('./print');
const buy = require('./buy');
const report = require('./report');
const printer = require('./printer');

const router = express.Router();

router.get('/test', (req, res) => { // initial testing
  res.send('OK');
});

router.use('/user', user);
router.use('/history', history);
router.use('/print', print);
router.use('/buy', buy);
router.use('/report',report);
router.use('/printer',printer);

module.exports = router;