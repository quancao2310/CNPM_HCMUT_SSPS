const db = require("../config/db");

async function getAllPrintOrders() {
  try {
    const [result, ] = await db.execute(
      `SELECT PO.print_id, C.name AS customer_name, D.name AS document_name, PO.time_start, PO.time_end, PO.status
      FROM print_order PO
        INNER JOIN document D ON PO.document_id = D.document_id
        INNER JOIN printer P ON D.printer_id = P.printer_id
        INNER JOIN customer C ON PO.user_id = C.customer_id
      ORDER BY PO.time_end DESC, PO.time_start DESC;`
    );
    return result;
  } catch (err) {
    throw err;
  }
}

async function getPrintOrdersByUserID(userID) {
  try {
    const [result, ] = await db.execute(
      `SELECT PO.print_id, D.name AS document_name, PO.time_start, PO.time_end, PO.status
      FROM print_order PO
        INNER JOIN document D ON PO.document_id = D.document_id
        INNER JOIN printer P ON D.printer_id = P.printer_id
      WHERE PO.user_id = ?
      ORDER BY PO.time_end DESC, PO.time_start DESC;`,
      [userID]
    );
    return result;
  } catch (err) {
    throw err;
  }
}

async function getPrintOrderByID(printID) {
  try {
    const [result, ] = await db.execute(
      `SELECT PO.print_id, C.name AS customer_name, P.name AS printer_name, PO.time_start, PO.time_end, PO.status, D.name AS document_name, D.file_type, D.no_of_pages, PO.page_size, PO.side, PO.orientation, PO.pages_per_sheet, PO.scale, PO.pages_to_be_printed
      FROM print_order PO 
        INNER JOIN document D ON PO.document_id = D.document_id
        INNER JOIN printer P ON D.printer_id = P.printer_id
        INNER JOIN customer C ON PO.user_id = C.customer_id
      WHERE PO.print_id=?;`,
      [printID]
    );
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getAllPrintOrders,
  getPrintOrdersByUserID,
  getPrintOrderByID
}

// async function getHistoryByUserId(userid, printerName, timeStart, timeEnd) {
//   try {
//     const [result, _] = await db.execute(
//       `SELECT PO.print_id, D.name, PO.time_start, PO.time_end, PO.status 
//       FROM print_order PO 
//         INNER JOIN document D ON PO.document_id = D.document_id 
//         INNER JOIN printer P ON D.printer_id = P.printer_id
//       WHERE PO.user_id = ? AND P.name=? AND PO.time_start>=? AND PO.time_end<=? 
//       ORDER BY PO.time_end DESC;`,
//       [userid, printerName, timeStart, timeEnd]
//     );
//     return result;
//   } catch (err) {
//     throw err;
//   }
// }

// async function getHistorySPSO(printerName, timeStart, timeEnd) {
//   try {
//     const [result, _] = await db.execute(
//       `SELECT PO.user_id, PO.print_id, D.name, PO.time_start, PO.time_end, PO.status 
//       FROM print_order PO 
//         INNER JOIN document D ON PO.document_id = D.document_id 
//         INNER JOIN printer P ON D.printer_id = P.printer_id
//       WHERE P.name=? AND PO.time_start>=? AND PO.time_end<=?
//       ORDER BY PO.time_end DESC;`,
//       [printerName, timeStart, timeEnd]
//     );
//     return result;
//   } catch (err) {
//     throw err;
//   }
// }