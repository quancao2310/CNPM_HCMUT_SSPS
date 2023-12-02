const db = require("../config/db");

async function SetBalanceAfterBuying(AddBalance, id, paying_status) {
    if (paying_status === "Paying success")
    {
        try {
            const cur_balance = await GetBalance(id);

            const updatedBalance = cur_balance + Number(AddBalance);

            const [result, _] = await db.execute(
              "UPDATE customer SET balance = ? WHERE customer_id = ?",
              [updatedBalance, id]
            );
            return {
              status: "Buying Success"
            };
          } catch (err) {
            console.error(err);
            throw err;
          }
    }
    else
    {
        return{
            status: "Buying Fail"
        }
    }
}

async function GetBalance(customer_id){
    try{
        const [result, _] = await db.execute(
            `SELECT balance
            FROM customer
            WHERE customer_id = ?;`,
            [customer_id]
        );
        return result[0].balance;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = {
    SetBalanceAfterBuying
};