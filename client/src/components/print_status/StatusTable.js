import StatusTag from "../utils/StatusTag";

function StatusTable({ data }){
    return (
        <div className="container-fluid">
            <table className="table mt-4">
                <thead>
                    <tr className="row">
                        <th className="text-center col-8" scope="col">Tên file</th>
                        <th className="text-center col-4" scope="col">Trạng thái</th>
                    </tr>
                </thead>
                <tbody id="file-status">
                    {
                        data.map((item, index) => (
                            <tr className="row">
                                <td className="text-center col-8">
                                    {item.name}
                                </td>
                                <td className="text-center col-4">
                                    <StatusTag status={item.status} />
                                </td>
                            </tr>
                        ))
                    } 
                </tbody>
            </table>
        </div>
    );
}

export default StatusTable;