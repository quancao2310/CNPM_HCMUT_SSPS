const {addPrinter, deletePrinter, searchPrinter, editPrinter, showInfoPrinter, enablePrinter, disablePrinter} = require("../models/Printer");




async function addPrinter(req, res, next) {
  try {
    const result = await addPrinter(req.body);
    req.body.document_id=result.insertId;
  } catch (err) {
    next(err);
  }
}

async function deletePrinter(req, res, next) {
  try {
    const result = await showInfoPrintOder(
      req.body.userInfo.id
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function searchPrinter(req, res, next) {
  try {
    const result = await ModifyBalance(
      req.body.updatedBalance,
      req.body.userInfo.id
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function infoPrinter(req, res, next) {
  try {
    const result = await showAllPrinter();
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function editPrinter(req, res, next) {
  try {
    const result = await showAllPrinter();
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function enablePrinter(req, res, next) {
  try {
    const result = await showAllPrinter();
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function disablePrinter(req, res, next) {
  try {
    const result = await showAllPrinter();
    res.json(result);
  } catch (err) {
    next(err);
  }
}
module.exports = {
  addPrinter,
  deletePrinter,
  searchPrinter,
  infoPrinter,
  editPrinter,
  enablePrinter,
  disablePrinter
};