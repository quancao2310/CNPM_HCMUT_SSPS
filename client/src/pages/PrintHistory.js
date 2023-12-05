import '../assets/styles/print_history.css';
import { useState, useEffect } from 'react';
import PrintHistoryTable from '../components/print_history/PrintHistoryTable';
import FilterBar from '../components/print_history/FilterBar';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function PrintHistory() {
  const [dataRows, setDataRows] = useState(null);
  const [cookies, , removeCookie] = useCookies();
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = cookies.auth;
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/history/customer`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setDataRows(response.data);
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
      <div className='col-12 my-3 text-center d-flex flex-wrap justify-content-center gap-3'>
        <h3>Dữ liệu đang tải, vui lòng chờ</h3>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  else if (dataRows.length > 0) {
    historyElement = (
      <>
      <div className='col-12 my-3'>
        <FilterBar />
      </div>
      <div className='col-12 my-3 table-responsive'>
        <PrintHistoryTable dataRows={dataRows} />
      </div>
      </>
    );
  }
  else {
    historyElement = <h3 className='col-12 my-3 text-center'>Không có dữ liệu về đơn in của bạn</h3>;
  }
  
  return (
    <div className='container-md mt-3'>
      <div className='row justify-content-center'>
        <h1 className='col-12 text-center'>Lịch sử in</h1>
        {historyElement}
      </div>
    </div>
  );
}

export default PrintHistory;