import RowRecord from "./RowRecord";

function PrintHistoryTable({ dataRows }) {
  return (
    <table className="table table-hover" id='history-table'>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Tên tài liệu</th>
          <th scope="col">Thời gian bắt đầu</th>
          <th scope="col">Thời gian kết thúc</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Xem chi tiết</th>
        </tr>
      </thead>
      <tbody>
        {dataRows.map((data, index) => 
        <RowRecord key={index} data={data} />
        )}
      </tbody>
    </table>
  );
}

export default PrintHistoryTable;