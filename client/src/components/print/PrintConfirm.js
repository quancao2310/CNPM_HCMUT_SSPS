function PrintConfirm(){
    return (
        <div
            className = "d-flex justify-content-center align-items-center p-2"
            style = {{
                background: 'linear-gradient(180deg, #70D2E5 0%, #FFFFFF 100%)',
                height: "85vh",
            }}
        >
            <div 
                className = "container rounded-4 w-50"
                style={{
                    background: 'rgba(255, 255, 255, 0.76)',
                }}
            
            >
                <div className = "text-center text-primary fs-1 fw-bold">
                    Xác nhận in
                </div>
                <div className = "mx-5">
                    <p>Tài liệu in: </p>
                    <p>Số trang in: </p>
                    <p>Số trang có sẵn: </p>
                </div>
                <div class = "d-flex justify-content-center">
                    <button className="col-3 btn btn-primary m-2">Xác nhận</button>
                    <button className="col-3 btn btn-danger m-2">Hủy</button>
                </div>
            </div>
        </div>
    );
}

export default PrintConfirm;