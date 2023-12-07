const {show_All_Printer, add_Printer, delete_Printer, search_Printer, edit_Printer, showInfo_Printer, enable_Printer, disable_Printer} = require("../models/Printer");


async function showAllPrinter(req, res, next) {
  try {
    const result = await show_All_Printer();
    res.json(result);
  } catch (err) {
    next(err);
  }
}


async function addPrinter(req, res, next) {
  try {
    const result = await add_Printer(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function deletePrinter(req, res, next) {
  try {
    const id = req.params.printer_id
    const result = await delete_Printer(
      id
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function searchPrinter(req, res, next) {
  try {
    const id = req.params.printer_id
    const result = await search_Printer(
      id
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function infoPrinter(req, res, next) {
  try {
    const id = req.params.printer_id
    const result = await showInfo_Printer(
      id
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function editPrinter(req, res, next) {
  try {
    const id = req.body.printer_id
    const result = await edit_Printer(
      req.body, id
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function enablePrinter(req, res, next) {
  try {
    const id = req.params.printer_id
    const result = await enable_Printer(
      id
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function disablePrinter(req, res, next) {
  try {
    const id = req.params.printer_id
    const result = await disable_Printer(
      id
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
}
module.exports = {
  showAllPrinter,
  addPrinter,
  deletePrinter,
  searchPrinter,
  infoPrinter,
  editPrinter,
  enablePrinter,
  disablePrinter
};