const express = require('express');
const router = express.Router();
const loginController = require('../controllers/LoginController');

//Authenticate cookie
// app.get('/', (req, res, next) => {
//   //Get value of cookie
//   const authCookie = req.cookies.auth;

//   jwt.verify(authCookie, 'the-super-strong-secrect', (err, decoded) => {
//     if (err) {
//       // Invalid Token
//       res.status(401).send('Token không hợp lệ');
//     } else {
//       // Valid Token
//       const usertype = decoded.type;
//       const userid = decoded.id;
//       //student token
//       if (usertype == 'student') {
//         db.query(
//           `SELECT * FROM customer WHERE customer_id = ${db.escape(userid)};`,
//           (err, result) => {
//             if (err) {
//               return res.status(400).send({
//                 msg: err
//               });
//             }
//             return res.status(200).send({
//               //return all in4 of user
//               result
//             });
//           }
//         )
//       }
//       //admin token
//       if (usertype == 'admin') {
//         db.query(
//           `SELECT * FROM spso WHERE spso_id = ${db.escape(userid)};`,
//           (err, result) => {
//             if (err) {
//               return res.status(400).send({
//                 msg: err
//               });
//             }
//             return res.status(200).send({
//               //return all in4 of user
//               result
//             });
//           }
//         )
//       }
//     }
//   });
// })


router.post('/customer', loginController.loginCustomer);
router.post('/spso', loginController.loginSPSO);

module.exports = router;