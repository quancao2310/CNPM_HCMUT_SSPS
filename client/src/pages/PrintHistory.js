import axios from 'axios';
import '../assets/styles/print_history.css';
import { useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Loading from '../components/utils/Loading';
import History from '../components/print_history/genaral/History';

function PrintHistory() {
  const { user } = useContext(UserContext);
  const [dataRows, setDataRows] = useState(null);
  const [cookies, , removeCookie] = useCookies();
  const navigate = useNavigate();
  const url = `${process.env.REACT_APP_SERVER_URL}/history/${user.isSPSO ? 'spso' : 'customer'}`;
  
  useEffect(() => {
    const token = cookies.auth;
    axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        let tmpData = [ ...response.data ];
        tmpData = tmpData.map((value) => {
          return {
            ...value,
            time_start: new Date(value.time_start),
            time_end: new Date(value.time_end)
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
    historyElement = <History data={dataRows} />;
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