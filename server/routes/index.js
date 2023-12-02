const express = require('express');
const login = require('./login');
const history = require('./history');
const print = require('./print');
const buy = require('./buy');
// const updatePassword = require('./hash_password')

const router = express.Router();

// router.use('/update-password', updatePassword)

router.get('/test', (req, res) => { // initial testing
  res.send('OK');
});

router.use('/login', login);
router.use('/history', history);
router.use('/print', print);
router.use('/buy', buy);

module.exports = router;