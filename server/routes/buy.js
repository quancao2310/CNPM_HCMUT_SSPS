const express = require('express');
const router = express.Router();
const buyController = require('../controllers/BuyController');
const authenticate = require('../middlewares/authenticate');

router
  .route('/')
  .get(authenticate, buyController.getPurchasesByUserID)
  .put(authenticate, buyController.createNewPurchaseOrder);
router
  .route('/:id')
  .get(authenticate, buyController.getPurchaseByPurchaseID)
  .post(authenticate, buyController.createNewPurchaseOrder);
// router.post('/send-code', authenticate, buyController.sendVerificationCode);
// router.post('/verify-code', authenticate, buyController.verifyCode);
// router.put('/buyPages',authenticate,buyController.AddPages);

// Chưa liên kết với authenticate
router.put('/buyPages',buyController.AddPages);

module.exports = router;