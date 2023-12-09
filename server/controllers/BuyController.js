const { SetBalanceAfterBuying } = require("../models/BuyPages");
const { getAllPurchaseOrders, getPurchaseOrderByID } = require("../models/PurchaseOrder");

// textflow.useKey(process.env.TEXTFLOW_API_KEY); // DELETED KEY

async function getPurchasesByUserID(req, res, next) {
  try {
    const id = req.userInfo.id;
    if (!id) {
      return res.status(404).send("Không có dữ liệu người dùng!");
    }
    
    const result = await getAllPurchaseOrders(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function getPurchaseByPurchaseID(req, res, next) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send("Không có dữ liệu!");
    }
    
    const result = await getPurchaseOrderByID(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

// async function sendVerificationCode(req, res, next) {
//   const phoneNumber = req.body.phoneNumber;
//   const verificationOptions = {
//     service_name: 'HCMUT SSPS',
//     seconds: 600
//   }
//   try {
//     const result = await textflow.sendVerificationSMS(phoneNumber, verificationOptions);
//     console.log(result);
//     res.status(result.status).json(result.message);
//   }
//   catch (err) {
//     next(err);
//   }
// }

// async function verifyCode(req, res, next) {
//   const { phoneNumber, code } = req.body;
//   try {
//     const result = await textflow.verifyCode(phoneNumber, code);
//     if (result.valid) {
//       return res.json(result.message);
//     }
//     res.status(result.status).json(result.message);
//   }
//   catch (err) {
//     next(err);
//   }
// }

async function AddPages(req, res, next) {
  try {
    const result = await SetBalanceAfterBuying(
      req.body.AddingBalance,
      req.body.id,
      req.body.paying_status
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
}



module.exports = {
  getPurchasesByUserID,
  getPurchaseByPurchaseID,
  // sendVerificationCode,
  // verifyCode,
  AddPages,
};
