const {
  getAllPrintOrders,
  getPrintOrdersByUserID,
  getPrintOrderByID,
} = require("../models/PrintOrder.js");

async function getAllPrintHistoryByUser(req, res, next) {
  try {
    if (!req.userInfo.id) {
      return res.status(400).send("User ID bị lỗi.");
    }

    const result = await getPrintOrdersByUserID(req.userInfo.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function getAllPrintHistoryBySPSO(req, res, next) {
  try {
    const result = await getAllPrintOrders();
    res.json(result);
  } catch (err) {
    next(err);
  }
}

// For sorting, not yet implemented
// async function historyCustomer(req, res, next) {
//   try{
//     const result = await getHistoryByUserId(req.userInfo.id, req.body.printerName, req.body.timeStart, req.body.timeEnd);
//     res.json(result);
//   }
//   catch (err){
//     next(err);
//   }
// }

async function getPrintOrderDetailByID(req, res, next) {
  try {
    const result = await getPrintOrderByID(req.params.printID);
    if (result.length === 0) {
      return res.status(404).json("Không tìm thấy đơn in theo ID đã cho.");
    }

    // Process data in controller
    const data = result[0];
    totalPrintedPages = 0;
    if (data.pages_to_be_printed == "All") {
      totalPrintedPages = data.no_of_pages;
    }
    else {
      const printedPagesArr = (data.pages_to_be_printed).split(",").map((pageRange) => pageRange.trim());
      for (const pageRange of printedPagesArr) {
        const numbers = pageRange.split("-").map((num) => Number(num));
        const [startNumber, endNumber] = numbers;
        if (endNumber) totalPrintedPages += endNumber - startNumber + 1;
        else totalPrintedPages++;
      }
    }
    let count = Math.ceil(totalPrintedPages / data.pages_per_sheet / data.side);
    if (count % 2 == 1) {
      ++count;
    }
    data.total_no_of_printed_pages = count;

    // Send data
    res.json(data);
  } catch (err) {
    next(err);
  }
}

// For sorting, not yet implemented
// async function historySPSO(req, res, next) {
//   try{
//     const result = await getHistorySPSO(req.body.printerName, req.body.timeStart, req.body.timeEnd);
//     res.json(result);
//   }
//   catch (err){
//     next(err);
//   }
// }

module.exports = {
  getAllPrintHistoryByUser,
  getAllPrintHistoryBySPSO,
  getPrintOrderDetailByID,
  // historyCustomer,
  // historySPSO,
};
