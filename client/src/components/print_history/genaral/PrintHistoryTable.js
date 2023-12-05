import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import RowRecord from "./RowRecord";

function PrintHistoryTable({ dataRows }) {
  const { user } = useContext(UserContext);
  return (
    <table className="table table-hover" id='history-table'>
      <thead>
        <tr className="align-middle">
          <th scope="col">ID</th>
          {user.isSPSO && <th scope="col">Người đặt in</th>}
          <th scope="col">Tên tài liệu</th>
          <th scope="col">Máy in</th>
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