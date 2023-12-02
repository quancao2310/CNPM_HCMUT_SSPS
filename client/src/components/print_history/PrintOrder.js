import { useEffect, useState } from "react";
import StatusTag from "../utils/StatusTag";
import GeneralDetailTable from "./GeneralDetailTable";

function PrintOrder({ id }) {
  const [printOrderData, setPrintOrderData] = useState([]);
  
  useEffect(() => {
    // fetch print order data, then
    setPrintOrderData([
      {
        name: 'ID',
        value: id
      },
      {
        name: 'Tổng số trang in',
        value: dummyData.total_printed_pages
      },
      {
        name: 'Máy in',
        value: dummyData.printer_name
      },
      {
        name: 'Thời gian bắt đầu',
        value: dummyData.time_start
      },
      {
        name: 'Thời gian kết thúc',
        value: dummyData.time_end
      },
      {
        name: 'Trạng thái',
        value: <StatusTag status={dummyData.status} />
      }
    ]);
  }, []);
  
  return (
    <section>
      <h3 className='ps-2'>Thông tin đơn in</h3>
      <GeneralDetailTable data={printOrderData} />
    </section>
  );
}

export default PrintOrder;

const dummyData = {
  id: 1,
  total_printed_pages: 50,
  printer_name: 'Máy in 1',
  time_start: new Date().toLocaleString('en-GB'),
  time_end: new Date().toLocaleString('en-GB'),
  status: 'In thành công'
}