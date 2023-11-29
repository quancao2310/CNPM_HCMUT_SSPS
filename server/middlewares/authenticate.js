const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.header('authorization').split(' ')[1];
  if (!token) {
    return res.status(401).send('Access Denied');
  }
  
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).send('Access Denied');
    }
    
    req.body.userInfo = decoded;
    next();
  });
}

module.exports = authenticate;