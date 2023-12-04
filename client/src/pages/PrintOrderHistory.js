import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../assets/styles/print_history.css';
import PrintOrder from '../components/print_history/PrintOrder';
import DocumentDetail from '../components/print_history/DocumentDetail';
import PrintConfig from '../components/print_history/PrintConfig';

function PrintOrderHistory() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  
  return (
    <div className='container my-3'>
      <div className='row justify-content-center'>
        <div className='col-md-10 col-lg-8'>
          <div className='card px-5 py-4' id='print-order-detail'>
            <h1 className='col-12 text-center mb-3'>Đơn in chi tiết</h1>
            <PrintOrder id={id} />
            <div className='border-top my-3'></div>
            <DocumentDetail id={id} />
            <div className='border-top my-3'></div>
            <PrintConfig id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrintOrderHistory;