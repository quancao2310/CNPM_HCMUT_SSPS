const db = require("../config/db");

async function showAllPrinter() {
  try {
    const [result, _] = await db.execute(
      `SELECT printer_id, name
        FROM printer
        ORDER BY printer_id`
    );
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports={
    showAllPrinter
}
