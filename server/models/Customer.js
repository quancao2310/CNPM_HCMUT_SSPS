const db = require('../config/db');

async function getCustomerByID(id) {
  try {
    const [result, ] = await db.execute('SELECT * FROM customer WHERE customer_id = ?', [id]);
    return result[0];
  } catch (err) {
    throw err;
  }
}

async function getCustomerByEmail(email) {
  try {
    const [result, ] = await db.execute('SELECT * FROM customer WHERE email = ?', [email]);
    return result[0];
  } catch (err) {
    throw err;
  }
}

async function setCustomerLastUsed(email) {
  try {
    const [result, ] = await db.execute('UPDATE customer SET last_used = now() WHERE email = ?', [email]);
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getCustomerByID,
  getCustomerByEmail,
  setCustomerLastUsed
};