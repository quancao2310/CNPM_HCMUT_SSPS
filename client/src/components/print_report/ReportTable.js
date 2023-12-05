import { Link } from 'react-router-dom';

function ReportTable({ input_data, isMonthlyType}) {
  return (
    <div className="container-fluid">
      <table className="table mt-4">
        <thead>
          <tr>
            <th className="text-center" scope="col">STT</th>
            {isMonthlyType && (<th className="text-center" scope="col">Tháng</th>)}
            <th className="text-center" scope="col">Năm</th>
            <th className="text-center" scope="col">Chi tiết</th>
          </tr>
        </thead>
        <tbody id="file-status">
          {input_data.map((item, index) => (
            <tr key={index + 1}>
              <td className="text-center">{index + 1}</td>
              {isMonthlyType && (<td className="text-center">{item.month ? item.month : ''}</td>)}
              <td className="text-center">{item.year}</td>
              <td className="text-center">
                <Link to={`report?year=${item.year}&month=${item.month}`}>
                  Báo cáo hệ thống SSPS {isMonthlyType ? `tháng ${item.month} - Năm` : 'năm'} {item.year}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportTable;
