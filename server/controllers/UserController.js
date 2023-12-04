const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getCustomerByID, getCustomerByEmail, setCustomerLastUsed } = require('../models/Customer');
const { getSPSOByID, getSPSOByUsername, setSPSOLastUsed } = require('../models/SPSO');

async function loginCustomer(req, res, next) {
  try {
    const result = await getCustomerByEmail(req.body.email);
    
    // user does not exists
    if (!result) {
      return res.status(400).send('Nhập sai email! Vui lòng thử lại.');
    }
    
    // check password
    bcrypt.compare(req.body.password, result.password, async (bErr, bResult) => {
      if (bErr) {
        return next(bErr);
      }
      
      // if wrong password, deny login
      if (!bResult) {
        return res.status(401).send('Nhập sai mật khẩu! Vui lòng thử lại.');
      }
      
      const token = jwt.sign(
        {
          id: result.customer_id,
          isSPSO: false,
          type: result.type
        }, 
        'the-super-strong-secret', 
        { expiresIn: '1h' }
      );
      
      // change time of last used (which is now)
      await setCustomerLastUsed(result.email);
      
      delete result.password;
      res
        .cookie('auth', token, { maxAge: 3600 * 1000, path: '/' }) // Cookies valid for 1 hour
        .json({ message: 'Đăng nhập thành công!', userInfo: result, token: token });
    });
  }
  catch (err) {
    next(err);
  }
}

async function loginSPSO(req, res, next) {
  try {
    const result = await getSPSOByUsername(req.body.username);
    
    // user does not exists
    if (!result) {
      return res.status(400).send('Nhập sai email! Vui lòng thử lại.');
    }
    
    // check password
    bcrypt.compare(req.body.password, result.password, async (bErr, bResult) => {
      if (bErr) {
        return next(bErr);
      }
      
      // if wrong password, deny login
      if (!bResult) {
        return res.status(401).send('Nhập sai mật khẩu! Vui lòng thử lại.');
      }
      
      const token = jwt.sign(
        {
          id: result.spso_id,
          isSPSO: true,
          username: result.username,
        }, 
        'the-super-strong-secret', 
        { expiresIn: '1h' }
      );
      
      // change time of last used (which is now)
      await setSPSOLastUsed(result.username);
      
      delete result.password;
      res
        .cookie('auth', token, { maxAge: 3600 * 1000, path: '/' })
        .json({ message: 'Đăng nhập thành công!', userInfo: result, token: token });
    });
  }
  catch (err) {
    next(err);
  }
}

async function getUserByID(req, res, next) {
  try {
    const id = req.userInfo.id, isSPSO = req.userInfo.isSPSO;
    if (id === undefined || isSPSO === undefined) {
      return res.status(404).send("Không có dữ liệu người dùng!");
    }
    let result;
    if (isSPSO) {
      result = await getSPSOByID(id);
    }
    else {
      result = await getCustomerByID(id);
    }
    
    // user does not exists, which should never occur after authentication but just in case...
    if (!result) {
      return res.status(400).send('Sao lại thế này????');
    }
    
    // Modify data before sending
    delete result.password;
    result.last_used = new Date(result.last_used);
    
    // Send data
    res.json(result);
  }
  catch (err) {
    next(err);
  }
}

module.exports = {
  loginCustomer,
  loginSPSO,
  getUserByID
};