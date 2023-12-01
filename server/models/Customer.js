const db = require('../config/db');

async function getCustomerByEmail(email) {
  try {
    const [result, _] = await db.execute('SELECT * FROM customer WHERE email = ?', [email]);
    return result[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function setCustomerLastUsed(email) {
  try {
    const [result, _] = await db.execute('UPDATE customer SET last_used = now() WHERE email = ?', [email]);
    // console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  getCustomerByEmail,
  setCustomerLastUsed
};