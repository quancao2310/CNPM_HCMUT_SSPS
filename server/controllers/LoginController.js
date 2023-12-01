const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getCustomerByEmail, setCustomerLastUsed } = require('../models/Customer');
const { getSPSOByUsername, setSPSOLastUsed } = require('../models/SPSO');

async function loginCustomer(req, res, next) {
  try {
    const result = await getCustomerByEmail(req.body.email);
    
    // user does not exists
    if (!result) {
      return res.status(400).send('Email is incorrect!');
    }
    
    // check password
    bcrypt.compare(req.body.password, result.password, async (bErr, bResult) => {
      if (bErr) {
        // return res.status(500).send('Something went wrong!');
        return next(bErr);
      }
      
      // if wrong password, deny login
      if (!bResult) {
        return res.status(401).send('Password is incorrect!');
      }
      
      const token = jwt.sign(
        {
          id: result.customer_id,
          type: result.type
        }, 
        'the-super-strong-secret', 
        { expiresIn: '1h' }
      );
      
      // change time of last used (which is now)
      await setCustomerLastUsed(result.email);
      
      res
        .cookie('auth', token, { maxAge: 3600 * 1000, path: '/' })
        .send('Logged in successfully!');
    });
  }
  catch (err) {
    // return res.status(500).send(err);
    next(err);
  }
}

async function loginSPSO(req, res, next) {
  try {
    const result = await getSPSOByUsername(req.body.username);
    
    // user does not exists
    if (!result) {
      return res.status(400).send('Email is incorrect!');
    }
    
    // check password
    bcrypt.compare(req.body.password, result.password, async (bErr, bResult) => {
      if (bErr) {
        return next(bErr);
      }
      
      // if wrong password, deny login
      if (!bResult) {
        return res.status(401).send('Password is incorrect!');
      }
      
      const token = jwt.sign(
        {
          id: result.spso_id,
          username: result.username,
        }, 
        'the-super-strong-secret', 
        { expiresIn: '1h' }
      );
      
      // change time of last used (which is now)
      await setSPSOLastUsed(result.username);
      
      res
        .cookie('auth', token, { maxAge: 3600 * 1000, path: '/' })
        .send('Logged in successfully!');
    });
  }
  catch (err) {
    next(err);
  }
}

module.exports = {
  loginCustomer,
  loginSPSO
};