import '../assets/styles/print_history.css';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import PrintHistoryTable from '../components/print_history/PrintHistoryTable';
import FilterBar from '../components/print_history/FilterBar';

function PrintHistory() {
  const { user } = useContext(UserContext);
  const [dataRows, setDataRows] = useState(dummyData);
  // const [dataRows, setDataRows] = useState('');
  
  useEffect(() => {
    // fetch data
  }, []);
  
  return (
    <div className='container-md mt-3'>
      <div className='row justify-content-center'>
        <h1 className='col-12 text-center'>Lịch sử in</h1>
        {dataRows ?
        <>
        <div className='col-12 my-3'>
          <FilterBar />
        </div>
        <div className='col-12 my-3 table-responsive'>
          <PrintHistoryTable dataRows={dataRows} />
        </div>
        </>
        :
        <h3 className='col-12 text-center'>Không có dữ liệu về đơn in của bạn</h3>
        }
      </div>
    </div>
  );
}

export default PrintHistory;

const dummyData = [
  {
    id: 1,
    document_name: 'abc.doc',
    time_start: new Date().toLocaleString('en-GB'),
    time_end: new Date().toLocaleString('en-GB'),
    status: 'In thành công'
  },
  {
    id: 2,
    document_name: 'def.pdf',
    time_start: new Date().toLocaleString('en-GB'),
    time_end: new Date().toLocaleString('en-GB'),
    status: 'In thất bại'
  },
  {
    id: 3,
    document_name: 'ghi.docx',
    time_start: new Date().toLocaleString('en-GB'),
    time_end: new Date().toLocaleString('en-GB'),
    status: 'Đang in'
  },
  {
    id: 4,
    document_name: 'jkl.pdf',
    time_start: new Date().toLocaleString('en-GB'),
    time_end: new Date().toLocaleString('en-GB'),
    status: 'Chưa in'
  },
]