const { getAllPurchaseOrders, getPurchaseOrderByID, createPurchaseOrder, updateStatus } = require("../models/PurchaseOrder");
const { updateBalance } = require("../models/Customer");

// textflow.useKey(process.env.TEXTFLOW_API_KEY); // DELETED KEY

async function getPurchasesByUserID(req, res, next) {
  try {
    const userID = req.userInfo.id;
    if (!userID) {
      return res.status(404).send("Không có dữ liệu người dùng!");
    }
    
    const result = await getAllPurchaseOrders(userID);
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

async function createNewPurchaseOrder(req, res, next) {
  try {
    const { amount, price, status } = req.body;
    const userID = req.userInfo.id;
    
    await createPurchaseOrder(userID, amount, price, status);
    
    if (status === 'paid') {
      await updateBalance(userID, amount);
      await updateStatus(userID, status);
    }
    res.send("Thêm đơn in chưa thanh toán thành công");
  }
  catch (err) {
    next(err);
  }
}

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
  createNewPurchaseOrder,
  // sendVerificationCode,
  // verifyCode,
  AddPages,
};
