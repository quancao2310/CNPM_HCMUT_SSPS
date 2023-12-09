import axios from 'axios';
import '../assets/styles/purchase.css';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/utils/Loading';
import BuyForm from '../components/purchase_order/BuyForm';
import PurchaseHistoryTable from '../components/purchase_order/PurchaseHistoryTable';

function PrintHistory() {
  const [dataRows, setDataRows] = useState(null);
  const [cookies, , removeCookie] = useCookies();
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = cookies.auth;
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/buy`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const tmpData = response.data.map((value) => {
          return {
            ...value,
            time: new Date(value.time)
          };
        });
        setDataRows(tmpData);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          removeCookie('auth', { path: '/' });
          localStorage.clear();
          setTimeout(() => {
            navigate('/login');
          }, 200);
        }
      });
  }, [cookies]);
  
  let historyElement;
  if (dataRows === null) {
    historyElement = (
      <div className='col-12 my-3 text-center'>
        <h3>Dữ liệu đang tải, vui lòng chờ</h3>
        <Loading />
      </div>
    );
  }
  else if (dataRows.length > 0) {
    historyElement = (
      <div className='col-12 my-3 table-responsive'>
        <PurchaseHistoryTable dataRows={dataRows} />
      </div>
    );
  }
  else {
    historyElement = <h3 className='col-12 my-3 text-center'>Không có dữ liệu về đơn mua trang của bạn</h3>;
  }
  
  return (
    <div className='container-md mt-3'>
      <div className='row justify-content-center'>
        <h1 className='col-12 text-center'>Thông tin mua trang</h1>
        {dataRows !== null && <BuyForm />}
        {historyElement}
      </div>
    </div>
  );
}

export default PrintHistory;