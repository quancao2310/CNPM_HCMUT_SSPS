function InfoTable({ name, num_pages, num_remain_pages }){
    return(
        <div className="table-responsive mx-5 my-4">
            <table className="table">
                <tbody>
                    <tr>
                        <th scope="row">Tài liệu in</th>
                        <td className="text-center">{name}</td>
                    </tr>
                    <tr>
                        <th scope="row">Số trang in</th>
                        <td className="text-center">{num_pages}</td>
                    </tr>
                    <tr>
                        <th scope="row">Số trang còn lại</th>
                        <td className="text-center">{num_remain_pages}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default InfoTable;