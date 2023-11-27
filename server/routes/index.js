const express = require('express');
const authentication = require('./authenticate')
const updatePassword = require('./hash_password')

const router = express.Router();

router.use('/update-password', updatePassword)

router.get('/test', (req, res) => { // initial testing
  res.send('OK');
});

router.use('/auth-login',authentication)

module.exports = router;