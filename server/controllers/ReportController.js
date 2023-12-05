const {GetReportYearMonth, GetReportFirstOrder} = require('../models/GetReportYearMonth');

async function GetReport(req, res, next){
    try{
        // const result = await getNumPagePrinted(req.body.print_id)
        const result = await GetReportYearMonth(req.body.month,
            req.body.year);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

async function GetReportFirst(req, res,next){
    try{
        const result = await GetReportFirstOrder();
        res.json(result);
    } catch (err) {
        next(err);
    }
}

module.exports = { 
    GetReport,
    GetReportFirst
};