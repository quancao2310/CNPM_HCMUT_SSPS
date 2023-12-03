const db = require("../config/db");

async function uploadDocument(data) {
  try {
    const dataToInsert = [
      data.name,
      data.file_type,
      data.no_of_pages,
      data.user_id,
      data.printer_id,
    ];

    const [result, _] = await db.execute("INSERT INTO document SET name = ?, file_type = ?, no_of_pages = ?, user_id = ?, printer_id = ?", dataToInsert);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function addPrintOrder(data) {
  try {
    const dataToInsert = [
      data.side,
      data.page_size,
      data.orientation,
      data.pages_per_sheet,
      data.scale,
      new Date(),
      new Date(),
      data.pages_to_be_printed,
      data.document_id,
      data.user_id,
    ];
    const [result, _] = await db.execute("INSERT INTO print_order SET side = ?, page_size = ?, orientation = ?, pages_per_sheet = ?, scale = ?, time_start = ?, time_end = ?, pages_to_be_printed = ?, document_id = ?, user_id = ?", 
    dataToInsert
    );
    return {
      status: "Success"
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function ModifyBalance(updatedBalance, user_id) {
  try {
    const [result, _] = await db.execute(
      "UPDATE customer SET balance = ? WHERE customer_id = ?",
      [updatedBalance, user_id]
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
