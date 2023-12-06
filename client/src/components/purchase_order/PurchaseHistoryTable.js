import RowRecord from "./RowRecord";

function PurchaseHistoryTable({ dataRows }) {
  return (
    <table className="table table-hover" id='purchase-table'>
      <thead>
        <tr className="align-middle">
          <th scope="col">ID</th>
          <th scope="col">Số lượng (Đơn vị: Trang A4)</th>
          <th scope="col">Số tiền</th>
          <th scope="col">Ngày thanh toán</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Thanh toán</th>
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

export default PurchaseHistoryTable;