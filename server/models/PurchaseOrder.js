const db = require('../config/db');

async function getAllPurchaseOrders(customerID) {
  try {
    const [result, ] = await db.execute('SELECT * FROM purchase_order WHERE user_id = ?', [customerID]);
    return result;
  } catch (err) {
    throw err;
  }
}

// getAllPurchaseOrders(2112444).then(data => console.log(data))

module.exports = {
  getAllPurchaseOrders
}