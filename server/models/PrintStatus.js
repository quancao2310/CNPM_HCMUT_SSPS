const db = require("../config/db");

async function showInfoPrintOder(user_id) {
  try {
    const [result, _] = await db.execute(
      "SELECT name, status FROM print_order PO INNER JOIN document D ON PO.document_id = D.document_id WHERE D.user_id = ? LIMIT 5;",
      [user_id]
    );
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {showInfoPrintOder};
