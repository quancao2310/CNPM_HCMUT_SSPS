const db = require('../config/db');

async function getSPSOByID(id) {
  try {
    const [result, _] = await db.execute('SELECT * FROM spso WHERE spso_id = ?', [id]);
    return result[0];
  } catch (err) {
    throw err;
  }
}

async function getSPSOByUsername(username) {
  try {
    const [result, _] = await db.execute('SELECT * FROM spso WHERE username = ?', [username]);
    return result[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function setSPSOLastUsed(username) {
  try {
    const [result, _] = await db.execute('UPDATE spso SET last_used = now() WHERE username = ?', [username]);
    return result[0];
  }
  catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  getSPSOByID,
  getSPSOByUsername,
  setSPSOLastUsed
};