const db = require("../config/db");

async function GetReportYearMonth(month=null, year){
    if (month == null)
    {
        return GetReportYear(year);
    }
    return GetReportMonth(month,year);
}

async function GetReportYear(year)
{
    try{        
        const [result, _] = await db.execute(
            `SELECT
                p.printer_id,
                COUNT(DISTINCT po.print_id) AS total_orders,
                SUM(CASE WHEN po.page_size = 'A3' THEN 
                        CASE WHEN po.pages_to_be_printed = 'ALL' THEN CEIL (d.no_of_pages / po.pages_per_sheet / po.side)
                             ELSE CEIL((SUBSTRING_INDEX(po.pages_to_be_printed, '-', -1) - SUBSTRING_INDEX(po.pages_to_be_printed, '-', 1) + 1) / po.pages_per_sheet / po.side)
                        END
                        ELSE 0 
                    END) AS total_A3_pages,
                SUM(CASE WHEN po.page_size = 'A4' THEN 
                        CASE WHEN po.pages_to_be_printed = 'ALL' THEN CEIL (d.no_of_pages / po.pages_per_sheet / po.side)
                             ELSE CEIL((SUBSTRING_INDEX(po.pages_to_be_printed, '-', -1) - SUBSTRING_INDEX(po.pages_to_be_printed, '-', 1) + 1) / po.pages_per_sheet / po.side)
                        END
                        ELSE 0 
                    END) AS total_A4_pages
            FROM
                print_order po
            INNER JOIN document d ON po.document_id = d.document_id
            INNER JOIN printer p ON d.printer_id = p.printer_id
            WHERE
                YEAR(po.time_end) = ? AND po.status = 'success'
            GROUP BY
                p.printer_id;`,
            [year]
        );
        
        return result;
        
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function GetReportMonth(month, year)
{
    try{
        const [result, _] = await db.execute(
            `SELECT
                p.printer_id,
                COUNT(DISTINCT po.print_id) AS total_orders,
                SUM(CASE WHEN po.page_size = 'A3' THEN 
                        CASE WHEN po.pages_to_be_printed = 'ALL' THEN CEIL (d.no_of_pages / po.pages_per_sheet / po.side)
                             ELSE CEIL((SUBSTRING_INDEX(po.pages_to_be_printed, '-', -1) - SUBSTRING_INDEX(po.pages_to_be_printed, '-', 1) + 1) / po.pages_per_sheet / po.side)
                        END
                        ELSE 0 
                    END) AS total_A3_pages,
                SUM(CASE WHEN po.page_size = 'A4' THEN 
                        CASE WHEN po.pages_to_be_printed = 'ALL' THEN CEIL (d.no_of_pages / po.pages_per_sheet / po.side)
                             ELSE CEIL((SUBSTRING_INDEX(po.pages_to_be_printed, '-', -1) - SUBSTRING_INDEX(po.pages_to_be_printed, '-', 1) + 1) / po.pages_per_sheet / po.side)
                        END
                        ELSE 0 
                    END) AS total_A4_pages
            FROM
                print_order po
            INNER JOIN document d ON po.document_id = d.document_id
            INNER JOIN printer p ON d.printer_id = p.printer_id
            WHERE
                YEAR(po.time_end) = ? AND MONTH(po.time_end) = ? AND po.status = 'success'
            GROUP BY
                p.printer_id;`,
            [year,month]
        );
        
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function GetReportFirstOrder()
{
    try{
        const [result, _] = await db.execute(
            `-- Lấy tháng và năm của đơn đặt hàng đầu tiên
            (SELECT MONTH(time_start) as month_of_first, YEAR(time_start) as year_of_first
             FROM print_order
             ORDER BY print_id ASC LIMIT 1)           
            `
        );
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = {
    GetReportYearMonth, 
    GetReportFirstOrder
};