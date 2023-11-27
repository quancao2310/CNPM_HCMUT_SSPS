const express = require('express');
const app = express();
const db = require('./database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//Authenticate cookie
app.get('/', (req, res, next) => {
  //Get value of cookie
  const authCookie = req.cookies.auth;

  jwt.verify(authCookie, 'the-super-strong-secrect', (err, decoded) => {
    if (err) {
      // Invalid Token
      res.status(401).send('Token không hợp lệ');
    } else {
      // Valid Token
      const usertype = decoded.type;
      const userid = decoded.id;
      //student token
      if (usertype == 'student') {
        db.query(
          `SELECT * FROM customer WHERE customer_id = ${db.escape(userid)};`,
          (err, result) => {
            if (err) {
              return res.status(400).send({
                msg: err
              });
            }
            return res.status(200).send({
              //return all in4 of user
              result
            });
          }
        )
      }
      //admin token
      if (usertype == 'admin') {
        db.query(
          `SELECT * FROM spso WHERE spso_id = ${db.escape(userid)};`,
          (err, result) => {
            if (err) {
              return res.status(400).send({
                msg: err
              });
            }
            return res.status(200).send({
              //return all in4 of user
              result
            });
          }
        )
      }
    }
  });
})

//Student Authentication
app.get('/student', (req, res, next) => {
  db.query(
    `SELECT * FROM customer WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {

      // user does not exists
      if (err) {
        return res.status(400).send({
          msg: err
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: 'Email is incorrect!'
        });
      }
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            return res.status(401).send({
              msg: 'Password is incorrect!'
            });
          }
          if (bResult) {
            const token = jwt.sign({
              id: result[0].customer_id,
              type: result[0].type
            }, 'the-super-strong-secrect', { expiresIn: '1h' });
            db.query(
              `UPDATE customer SET last_used = now() WHERE email = '${result[0].email}'`
            );
            res.cookie('auth', token, { maxAge: 3600 * 1000 });
            return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]
            });
          }
          return res.status(401).send({
            msg: 'Username or password is incorrect!'
          });
        }
      );
    });
});


//Admin authentication
app.get('/admin', (req, res, next) => {
  db.query(
    `SELECT * FROM spso WHERE username = ${db.escape(req.body.username)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        return res.status(400).send({
          msg: err
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: 'Email is incorrect!'
        });
      }
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            return res.status(401).send({
              msg: 'Password is incorrect!'
            });
          }
          if (bResult) {
            const token = jwt.sign({
              id: result[0].spso_id,
              type: result[0].type
            }, 'the-super-strong-secrect', { expiresIn: '1h' });
            db.query(
              `UPDATE spso SET last_used = now() WHERE username = '${result[0].username}'`
            );
            res.cookie('auth', token, { maxAge: 3600 * 1000 });
            return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]
            });
          }
          else {
            return res.status(401).send({
              msg: 'Username or password is incorrect!'
            });
          }
        }
      );
    });
});

module.exports = app;
