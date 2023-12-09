const db = require('../config/db');

async function getAllPurchaseOrders(customerID) {
  try {
    const [result, ] = await db.execute('SELECT * FROM purchase_order WHERE user_id = ?', [customerID]);
    return result;
  } catch (err) {
    throw err;
  }
}

async function getPurchaseOrderByID(purchaseID) {
  try {
    const [result, ] = await db.execute('SELECT * FROM purchase_order WHERE purchase_id = ?', [purchaseID]);
    return result[0];
  } catch (err) {
    throw err;
  }
}

async function createPurchaseOrder(userID, amount, price, status) {
  try {
    const d = new Date();
    const currentTime = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    const [result, ] = await db.execute(
      `INSERT INTO purchase_order (time, amount, price, status, user_id) VALUES (?, ?, ?, ?, ?)`,
      [currentTime, amount, price, status, userID]
    );
    
    return result;
  } catch (err) {
    throw err;
  }
}

async function updateStatus(userID, status) {
  try {
    const [result, ] = await db.execute(
      `UPDATE purchase_order SET status = ? WHERE user_id = ?`,
      [status, userID]
    );
    return result;
  } catch (err) {
    throw err;
  }
}

// getAllPurchaseOrders(2112444).then(data => console.log(data))

module.exports = {
  getAllPurchaseOrders,
  getPurchaseOrderByID,
  createPurchaseOrder,
  updateStatus
}