import StatusTag from "../utils/StatusTag";

function StatusTable({ data }){
    return (
        <table className="table mt-4">
            <thead>
                <tr className="row">
                    <th className="text-center col-5" scope="col">Tên file</th>
                    <th className="text-center col-5" scope="col">Địa điểm</th>
                    <th className="text-center col-2" scope="col">Trạng thái</th>
                </tr>
            </thead>
            <tbody id="file-status">
                {
                    data.map((item, index) => (
                        <tr className="row" key={index}>
                            <td className="col-5 ps-4">
                                {item.name}
                            </td>
                            <td className="col-5 ps-5">
                                {item.loc_campus==="1"?'Cơ sở Lý Thường Kiệt':'Cơ sở Dĩ An'}, Phòng {item.loc_building}-{item.loc_room}
                            </td>
                            <td className="text-center col-2">
                                <StatusTag status={item.status} />
                            </td>
                        </tr>
                    ))
                } 
            </tbody>
        </table>
    );
}

export default StatusTable;