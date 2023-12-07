export default function Searchbar() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-lg-5 col-xl-4">
                    <h1>Danh sách máy in</h1>
                </div>
                <div className="col-md-12 col-lg-7 col-xl-8 mt-3">
                    <div className="row">
                        <div className="col-3 col-sm-4">
                            <button 
                                type="button" 
                                className="btn btn-primary float-end"
                                data-bs-toggle="modal" 
                                data-bs-target="#addPrinterForm"
                            >
                                Thêm máy in
                            </button>
                            <div className="modal fade" id="addPrinterForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Thông tin máy in</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="container-fluid">
                                                <div className="row mt-1 mb-1">
                                                    <div className="col-4 mt-2">
                                                        Tên máy in:
                                                    </div>
                                                    <div className="col">
                                                        <input className="form-control" id="new_printer_name"/>
                                                    </div>
                                                </div>
                                                <div className="row mt-1 mb-1">
                                                    <div className="col-4 mt-2">
                                                        Hãng sản xuất:
                                                    </div>
                                                    <div className="col">
                                                        <input className="form-control" id="new_printer_brand"/>
                                                    </div>
                                                </div>
                                                <div className="row mt-1 mb-1">
                                                    <div className="col-4 mt-2">
                                                        Loại máy in:
                                                    </div>
                                                    <div className="col">
                                                        <input className="form-control" id="new_printer_model"/>
                                                    </div>
                                                </div>
                                                <div className="row mt-1 mb-1">
                                                    <div className="col-4 mt-2">
                                                        Mô tả:
                                                    </div>
                                                    <div className="col">
                                                        <textarea className="form-control" id="new_printer_description"/>
                                                    </div>
                                                </div>
                                                <div className="row mt-1 mb-1">
                                                    <div className="col-2 mt-2">
                                                        Vị trí:
                                                    </div>
                                                    <div className="col mt-2">
                                                        Cơ sở: 
                                                        <select name="campus" id="campus" className="form-control">
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                        </select>
                                                    </div>
                                                    <div className="col mt-2">
                                                        Tòa: 
                                                        <input className="form-control" id="new_printer_building"/>
                                                    </div>
                                                    <div className="col mt-2">
                                                        Phòng: 
                                                        <input className="form-control" id="new_printer_room"/>
                                                    </div>
                                                </div>
                                                <div className="row mt-1 mb-1">
                                                    <div className="col-4 mt-2">
                                                        Trạng thái:
                                                    </div>
                                                    <div className="col">
                                                        <select name="status" id="status" className="form-control">
                                                            <option value="on">Đang hoạt động</option>
                                                            <option value="off">Đang tắt</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                                Hủy
                                            </button>
                                            <button type="button" className="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#successAlertModal">Thêm máy in</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal fade" id="successAlertModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-body text-center">
                                            <div className="mt-3 mb-5">
                                                <h2>Thêm máy in thành công!</h2>
                                            </div>
                                            <div className="m-2">
                                                <button 
                                                    className="btn btn-primary" 
                                                    data-bs-dismiss="modal"
                                                    style={{
                                                        width: 100
                                                    }}
                                                >
                                                    OK
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="input-group mb-3">
                                <button className="btn btn-outline-secondary" type="button" id="button-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                    </svg>
                                </button>
                                <input type="text" className="form-control" placeholder="Tìm kiếm máy in" aria-label="Example text with button addon" aria-describedby="button-addon1" id="search_printer"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}