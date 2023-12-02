const {SetBalanceAfterBuying} = require("../models/BuyPages");



async function AddPages(req, res, next){
    try{
        const result = await SetBalanceAfterBuying(
            req.body.AddingBalance,
            req.body.id,
            req.body.paying_status
        );
        res.json(result);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    AddPages
};