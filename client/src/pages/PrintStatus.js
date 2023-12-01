import { Link } from 'react-router-dom';

function PrintStatus(){
    return (
        <div
            className = "d-flex justify-content-center align-items-center p-5"
            style = {{
                background: 'linear-gradient(180deg, #70D2E5 0%, #FFFFFF 100%)',
                height: "100vh",
            }}
        >
            <div 
                className = "container rounded-4 w-50"
                style={{
                    background: 'rgba(255, 255, 255, 0.76)',
                }}
            
            >
                <div className = "text-center text-primary fs-1 fw-bold">
                    Trạng thái in
                </div>
                <table className="table" id="file-status">
                    <thead>
                        <tr>
                            <th scope="col">Tên file</th>
                            <th className="text-end" scope="col">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>FileA.txt</td>
                            <td className="text-end">In thành công</td>
                        </tr>
                    </tbody>
                    </table>
                <div class = "d-flex justify-content-center p-2">
                    <Link className = "btn btn-primary" to='/print'>Thoát</Link>
                </div>
            </div>
        </div>
    );
}

export default PrintStatus;