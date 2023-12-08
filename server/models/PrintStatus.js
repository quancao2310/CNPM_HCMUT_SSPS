const db = require("../config/db");

async function showInfoPrintOrder(user_id) {
  try {
    const [result, _] = await db.execute(
      "SELECT D.name, PO.status, P.loc_campus, P.loc_room, P.loc_building FROM print_order PO INNER JOIN document D ON PO.document_id = D.document_id INNER JOIN printer P ON D.printer_id = P.printer_id WHERE D.user_id = ? ORDER BY PO.time_start DESC;",
      [user_id]
    );
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {showInfoPrintOrder};
