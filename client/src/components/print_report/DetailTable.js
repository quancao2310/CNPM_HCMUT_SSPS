function DetailTable({ data }) {
  return (
    <div className="container-fluid pb-2">
      <table className="table table-hover mt-4">
        <thead>
          <tr className="align-middle">
            <th className="text-center" scope="col">STT</th>
            <th className="text-center" scope="col">Máy in</th>
            <th className="text-center" scope="col">Số đơn đặt hàng</th>
            <th className="text-center" scope="col">Số trang giấy A3</th>
            <th className="text-center" scope="col">Số trang giấy A4</th>
          </tr>
        </thead>
        <tbody id="file-status">
          {!data?<></>:data.map((item, index) => (
            <tr key={index + 1}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{'Máy in ' + item.printer_id}</td>
              <td className="text-center">{Number(item.total_orders)}</td>
              <td className="text-center">{Number(item.total_A3_pages)}</td>
              <td className="text-center">{Number(item.total_A4_pages)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DetailTable;
