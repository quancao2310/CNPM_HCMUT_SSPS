//Lưu ý: ĐÂY LÀ API CHỈ DÙNG 1 LẦN TRONG ĐỜI
//Do đó: NẾU CÓ DỮ LIỆU NGƯỜI DÙNG KHÁC ĐƯỢC THÊM VÀO DATABASE, CẦN PHẢI ĐẬP HẾT DỮ LIỆU ĐÃ ĐƯỢC HASH TRƯỚC ĐÓ (Password) VÀ HASH LẠI
//Nghĩa là: CÁC DỮ LIỆU TRƯỚC ĐÓ ĐƯỢC HASH PHẢI TRẢ LẠI NGUYÊN VẸN, SAU ĐÓ MỚI ĐƯỢC THÊM DỮ LIỆU MỚI VÀO VÀ BẮT ĐẦU HASH.
//Nếu không: CÁC DỮ LIỆU SẼ BỊ HASH CỦA HASH CỦA HASH...HASH LỒNG NHAU VÀ SẼ KHÔNG MÒ RA ĐƯỢC PASSWORD ĐÂU MÀ ĐĂNG NHẬP (❁´◡`❁)


const express = require('express')
const db = require('./database')
const bcrypt = require('bcryptjs')

const app = express()

app.get('/', (req, res, next) => {
    //Hash password customer
    db.query('SELECT * FROM customer', (err, results, fields) => {
        if (err) {
            console.error('Error selecting users:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        results.forEach(async (row) => {
            const hashedPassword = await bcrypt.hash(row.password, 10);
            db.query('UPDATE customer SET password = ? WHERE customer_id = ?', [hashedPassword, row.customer_id], (updateErr) => {
                if (updateErr) {
                    console.error('Error updating password:', updateErr);
                }
            });
        });
    })
    db.query('SELECT * FROM spso', (err, results, fields) => {
        if (err) {
            console.error('Error selecting users:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        results.forEach(async (row) => {
            const hashedPassword = await bcrypt.hash(row.password, 10);
            db.query('UPDATE spso SET password = ? WHERE spso_id = ?', [hashedPassword, row.spso_id], (updateErr) => {
                if (updateErr) {
                    console.error('Error updating password:', updateErr);
                }
            });
        });
    })
    res.send('Finish update password!');
})
module.exports = app

