function InfoTable({ name, num_pages, page_size, processed_num_pages, num_remain_pages, campus, room }){
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
                        <th scope="row">Loại trang in</th>
                        <td className="text-center">{page_size}</td>
                    </tr>
                    <tr>
                        <th scope="row">Số trang in sau khi quy đổi</th>
                        <td className="text-center">{processed_num_pages}</td>
                    </tr>
                    <tr>
                        <th scope="row">Số trang còn lại</th>
                        <td className="text-center">{num_remain_pages}</td>
                    </tr>
                    <tr>
                        <th scope="row">Địa điểm nhận tài liệu</th>
                        <td className="text-center">{
                            campus==1?'Cơ sở Lý Thường Kiệt':'Cơ sở Dĩ An' + ' - Phòng ' + room
                        }</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default InfoTable;