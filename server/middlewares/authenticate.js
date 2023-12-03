const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.header('authorization').split(' ')[1];
  if (!token) {
    return res.status(401).send('Truy cập bị từ chối');
  }
  
  jwt.verify(token, 'the-super-strong-secret', (err, decoded) => {
    if (err) {
      return res.status(401).send('Truy cập bị từ chối');
    }
    
    req.userInfo = decoded;
    next();
  });
}

module.exports = authenticate;