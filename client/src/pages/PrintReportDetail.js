import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PrintReportDetail(){
    const { year, month } = useParams();
    const { data, setData } = useState({});
    useEffect(() => {
        const input = {
            month: month,
            year: year
        }
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/report/getReport?year=${year}&month=${month}`, input)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);
    return (
        <div className="container-fluid">
            <div className="row justify-content-center p-1s">
                <h1 className='col-12 text-center p-3'>
                    Báo cáo hệ thống{month?` tháng ${month}`:''} năm {year}
                </h1>
            </div>
            <table>
                
            </table>
        </div>
    );
}

export default PrintReportDetail;