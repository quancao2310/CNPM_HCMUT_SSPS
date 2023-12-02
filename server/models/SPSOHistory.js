const db = require("../config/db");

async function getHistorySPSO(printerName, timeStart, timeEnd) {
  try {
    const [result,_] = await db.execute(
      `SELECT PO.print_id, D.name, PO.time_start, PO.time_end, PO.status 
      FROM print_order PO 
        INNER JOIN document D ON PO.document_id = D.document_id 
      WHERE P.name=? AND PO.time_start>=? AND PO.time_end<=?
      ORDER BY PO.time_end DESC;`
      [printerName, timeStart, timeEnd]
    );
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getHistorySPSOByUserId(userid) {
  try {
    const [result,_] = await db.execute(
      "SELECT * FROM print_order PO INNER JOIN document D ON PO.document_id = D.document_id WHERE PO.user_id = ? ORDER BY PO.time_end DESC;",
      [userid]
    );
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  getHistorySPSO,
  getHistorySPSOByUserId,
};
