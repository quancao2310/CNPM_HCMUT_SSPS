import StatusTag from "../utils/StatusTag";
import GeneralDetailTable from "./GeneralDetailTable";

function PrintOrder({ data }) {
  const printOrderData = [
    {
      name: 'ID',
      value: data.print_id
    },
    {
      name: 'Tổng số trang in',
      value: data.total_no_of_printed_pages
    },
    {
      name: 'Máy in',
      value: data.printer_name
    },
    {
      name: 'Thời gian bắt đầu',
      value: new Date(data.time_start).toLocaleString('en-GB')
    },
    {
      name: 'Thời gian kết thúc',
      value: new Date(data.time_end).toLocaleString('en-GB')
    },
    {
      name: 'Trạng thái',
      value: <StatusTag status={data.status} />
    }
  ];
  
  return (
    <section>
      <h3 className='ps-2'>Thông tin đơn in</h3>
      <GeneralDetailTable data={printOrderData} />
    </section>
  );
}

export default PrintOrder;