const db = require("../config/db");

async function uploadDocument(data) {
  try {
    const dataToInsert1 = {
      name: data.name,
      file_type: data.file_type,
      no_of_pages: data.no_of_pages,
      user_id: data.user_id,
      printer_id: data.printer_id,
    };

    const [result, _] = await db.execute("INSERT INTO document SET ?;", [
      dataToInsert1,
    ]);

    return {
      status: "Success"
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function addPrintOrder(data) {
  try {
    const dataToInsert = {
      side: data.size,
      page_size: data.page_size,
      orientation: data.orientation,
      pages_per_sheet: data.pages_per_sheet,
      scale: data.scale,
      time_end: new Date(),
      status: "not_printed",
      pages_to_be_printed: data.pages_to_be_printed,
      document_id: data.document_id,
      user_id: data.user_id,
    };
    const [result, _] = await db.execute("INSERT INTO print_order SET ?", [
      dataToInsert,
    ]);
    return {
      status: "Success"
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function ModifyBalance(updatedBalance, print_id) {
  try {
    const [result, _] = await db.execute(
      "UPDATE customer SET balance = ? WHERE customer_id IN (SELECT user_id FROM print_order WHERE print_id = ?)",
      [updatedBalance, print_id]
    );
    return {
      status: "Success"
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  uploadDocument,
  addPrintOrder,
  ModifyBalance
};
