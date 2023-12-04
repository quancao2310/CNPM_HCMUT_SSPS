import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../assets/styles/print_history.css';
import PrintOrder from '../components/print_history/PrintOrder';
import DocumentDetail from '../components/print_history/DocumentDetail';
import PrintConfig from '../components/print_history/PrintConfig';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function PrintOrderHistory() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [cookies, , removeCookie] = useCookies();
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = cookies.auth;
    if (!token) {
      navigate('/login');
    }
    else {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/history/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          if (error.response?.status === 401) {
            removeCookie('auth', { path: '/' });
            localStorage.clear();
            window.location.assign('/');
          }
          if (error.response?.status === 404) {
            setData(undefined);
          }
        });
    }
  }, [cookies]);
  
  let detailElement;
  if (data === null) {
    detailElement = (
      <div className='col-12 my-3 text-center d-flex flex-wrap justify-content-center gap-3'>
        <h3>Dữ liệu đang tải, vui lòng chờ</h3>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  else if (data === undefined) {
    detailElement = <h3 className='col-12 my-3 text-center'>Không có dữ liệu về đơn in của bạn</h3>;
  }
  else {
    detailElement = (
      <div className='card px-5 py-4' id='print-order-detail'>
        <h1 className='col-12 text-center mb-3'>Đơn in chi tiết</h1>
        <PrintOrder data={data} />
        <div className='border-top my-3'></div>
        <DocumentDetail data={data} />
        <div className='border-top my-3'></div>
        <PrintConfig data={data} />
      </div>
    );
  }
  
  return (
    <div className='container my-3'>
      <div className='row justify-content-center'>
        <div className='col-md-10 col-lg-8'>
          {detailElement}
        </div>
      </div>
    </div>
  );
}

export default PrintOrderHistory;