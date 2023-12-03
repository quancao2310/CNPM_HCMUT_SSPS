const {getHistoryByUserId, getHistoryByPrintId} = require('../models/CustomerHistory');
const {getHistorySPSO, getHistorySPSOByUserId} = require('../models/SPSOHistory');

async function historyCustomer(req, res, next) {
  try{
    const result = await getHistoryByUserId(req.userInfo.id, req.body.printerName, req.body.timeStart, req.body.timeEnd);
    res.json(result);
  }
  catch (err){
    next(err);
  }
}

async function historyCustomerByPrintOderID(req, res, next) {
  try{
    const result = await getHistoryByPrintId(req.query.printId);
    res.json(result);
  }
  catch (err){
    next(err);
  }
}

async function historySPSO(req, res, next) {
  try{
    const result = await getHistorySPSO(req.body.printerName, req.body.timeStart, req.body.timeEnd);
    res.json(result);
  }
  catch (err){
    next(err);
  }
}

async function historyByUserId(req, res, next) {
  try{
    const result = await getHistorySPSOByUserId(req.query.printId);
    res.json(result);
  }
  catch (err){
    next(err);
  }
}

module.exports = {
  historyCustomer,
  historyCustomerByPrintOderID,
  historySPSO,
  historyByUserId
};
