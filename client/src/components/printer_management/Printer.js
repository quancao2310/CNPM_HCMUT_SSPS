import {useState} from 'react' 

export default function Printer(props) {
    const [isDisabled, setIsDisabled] = useState(true)
    const [isDisabledDelete, setIsDisabledDelete] = useState(true)
    const [isDisabledOn, setIsDisabledOn] = useState(true)
    const [isDisabledOff, setIsDisabledOff] = useState(false)

    const handleSetDisableDelete = () => {
        setIsDisabledDelete(true)
    }
    const handleSetDelete = () => {
        setIsDisabledDelete(false)
    }
    const handleSetDisableOn = () => {
        setIsDisabledOn(true)
    }
    const handleSetOn = () => {
        setIsDisabledOn(false)
    }
    const handleSetDisableOff = () => {
        setIsDisabledOff(true)
    }
    const handleSetOff = () => {
        setIsDisabledOff(false)
    }

    const handleUpdateInfoPrinter = () => {
        setIsDisabled(false)

        document.getElementById("update").style.display = "none"
        document.getElementById("delete").style.display = "none"
        document.getElementById("on").style.display = "none"
        document.getElementById("off").style.display = "none"

        document.getElementById("updateConfirm").style.display = ""
        document.getElementById("updateCancel").style.display = ""
    }
    const handleViewInfoPrinter = () => {
        document.getElementById("update").style.display = ""
        document.getElementById("delete").style.display = ""
        document.getElementById("on").style.display = ""
        document.getElementById("off").style.display = ""

        document.getElementById("updateConfirm").style.display = "none"
        document.getElementById("updateCancel").style.display = "none"
    }
    const handleSetDisabled = () => {
        setIsDisabled(true)
    }

    function handleDisablePrinter() {
        var status = document.getElementById("status" + props.id).value

        if (status === "on") {
            handleSetDisableDelete()
            handleSetDisableOn()
            handleSetOff()
        }
        if (status === "off") {
            handleSetDelete()
            handleSetOn()
            handleSetDisableOff()
        }
    }

    return (
        <div>
            <div className="text-center">
                <img 
                    src="https://www.midwest.xeroxbusinesssolutions.com/wp-content/uploads/sites/8/2022/10/xerox-altalink-b1800-series-tn.jpg" 
                    alt="printer"
                    style={{
                        width: "190px"
                    }}
                />
                <button 
                    type="button" 
                    className="btn btn-primary"
                    data-bs-toggle="modal" 
                    data-bs-target="#infoPrinter"
                    onClick={handleSetDisabled}
                >
                    {"Máy in " + props.id}
                </button>
            </div>
            {/* <PrinterInfo name={props.name}/> */}
            <div className="modal fade" id="infoPrinter" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Thông tin máy in</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleSetDisabled}></button>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row mt-1 mb-1">
                                    <div className="col-4 mt-2">
                                        Tên máy in:
                                    </div>
                                    <div className="col">
                                        <input className="form-control" type="text" defaultValue={"Máy in " + props.id} autoComplete={"Máy in " + props.id} id={"name" + props.id} disabled={isDisabled}/>
                                    </div>
                                </div>
                                <div className="row mt-1 mb-1">
                                    <div className="col-4 mt-2">
                                        Hãng sản xuất:
                                    </div>
                                    <div className="col">
                                        <input className="form-control" type="text" defaultValue="HP" id={"brand" + props.id} disabled={isDisabled}/>
                                    </div>
                                </div>
                                <div className="row mt-1 mb-1">
                                    <div className="col-4 mt-2">
                                        Loại máy in:
                                    </div>
                                    <div className="col">
                                        <input className="form-control" type="text" defaultValue="HP OfficeJet 8015e" id={"model" + props.id} disabled={isDisabled}/>
                                    </div>
                                </div>
                                <div className="row mt-1 mb-1">
                                    <div className="col-4 mt-2">
                                        Mô tả:
                                    </div>
                                    <div className="col">
                                        <textarea className="form-control" type="text" defaultValue="Máy in HP OfficeJet 8015 có khả năng in, sao chép, quét và gửi fax một cách hiệu quả. Nó cũng hỗ trợ các tính năng đáng tin cậy như in hai mặt tự động và in từ xa thông qua kết nối Wi-Fi và Bluetooth. Với mẫu mã đẹp và kiểu dáng nhỏ gọn, nó làm cho việc giải quyết các nhu cầu văn phòng dễ dàng hơn." id={"description" + props.id} disabled={isDisabled}/>
                                    </div>
                                </div>
                                <div className="row mt-1 mb-1">
                                    <div className="col-2 mt-2">
                                        Vị trí:
                                    </div>
                                    <div className="col mt-2">
                                        <div>
                                            Cơ sở: 
                                            <select name="campus" id={"campus" + props.id} className="form-control" disabled={isDisabled}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                            </select>    
                                        </div>
                                    </div>
                                    <div className="col mt-2">
                                        Tòa: 
                                        <input className="form-control" type="text" defaultValue="B1" id={"building" + props.id} disabled={isDisabled}/>
                                    </div>
                                    <div className="col mt-2">
                                        Phòng: 
                                        <input className="form-control" type="text" defaultValue="101" id={"room" + props.id} disabled={isDisabled}/>
                                    </div>
                                </div>
                                <div className="row mt-1 mb-1">
                                    <div className="col-4 mt-2">
                                        Trạng thái:
                                    </div>
                                    <div className="col">
                                        <select name="status" id={"status" + props.id} className="form-control" disabled={isDisabled} onChange={handleDisablePrinter}>
                                            <option value="on">Đang hoạt động</option>
                                            <option value="off">Đang tắt</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" id="update" onClick={handleUpdateInfoPrinter}>Sửa thông tin</button>
                            <button type="button" className="btn btn-secondary" id="delete" data-bs-toggle="modal" data-bs-target="#deleteConfirm" disabled={isDisabledDelete}>Xóa</button>
                            <button type="button" className="btn btn-success" id="on" data-bs-toggle="modal" data-bs-target="#onConfirm" disabled={isDisabledOn}>Kích hoạt</button>
                            <button type="button" className="btn btn-danger" id="off" data-bs-toggle="modal" data-bs-target="#offConfirm" disabled={isDisabledOff}>Vô hiệu hóa</button>
                            <button type="button" className="btn btn-secondary" id="updateCancel" style={{display: "none"}} onClick={handleViewInfoPrinter}>Hủy</button>
                            <button type="button" className="btn btn-primary" id="updateConfirm" data-bs-toggle="modal" data-bs-target="#updateSuccessAlert" style={{display: "none"}}>Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="deleteConfirm" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <div className="mt-3 mb-5">
                                <h2>{"Xác nhận xóa máy in " + props.id + "?"}</h2>
                            </div>
                            <div className="m-2">
                                <button 
                                    className="btn btn-secondary" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#infoPrinter"
                                    style={{
                                        width: 100,
                                        marginRight: 30
                                    }}
                                >
                                    Hủy
                                </button>
                                <button 
                                    className="btn btn-primary" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#deleteSuccessAlert"
                                    style={{
                                        width: 100,
                                        marginLeft: 30
                                    }}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="deleteSuccessAlert" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <div className="mt-3 mb-5">
                                <h2>Xóa máy in thành công!</h2>
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
            <div className="modal fade" id="onConfirm" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <div className="mt-3 mb-5">
                                <h2>{"Xác nhận kích hoạt máy in " + props.id + "?"}</h2>
                            </div>
                            <div className="m-2">
                                <button 
                                    className="btn btn-secondary" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#infoPrinter"
                                    style={{
                                        width: 100,
                                        marginRight: 30
                                    }}
                                >
                                    Hủy
                                </button>
                                <button 
                                    className="btn btn-primary" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#onSuccessAlert"
                                    style={{
                                        width: 100,
                                        marginLeft: 30
                                    }}
                                >
                                    Kích hoạt
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="onSuccessAlert" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <div className="mt-3 mb-5">
                                <h2>Kích hoạt máy in thành công!</h2>
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
            <div className="modal fade" id="offConfirm" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <div className="mt-3 mb-5">
                                <h2>{"Xác nhận vô hiệu hóa máy in " + props.id + "?"}</h2>
                            </div>
                            <div className="m-2">
                                <button 
                                    className="btn btn-secondary" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#infoPrinter"
                                    style={{
                                        width: 100,
                                        marginRight: 30
                                    }}
                                >
                                    Hủy
                                </button>
                                <button 
                                    className="btn btn-primary" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#offSuccessAlert"
                                    style={{
                                        width: 150,
                                        marginLeft: 30
                                    }}
                                >
                                    Vô hiệu hóa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="offSuccessAlert" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <div className="mt-3 mb-5">
                                <h2>Vô hiệu hóa máy in thành công!</h2>
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
            <div className="modal fade" id="updateSuccessAlert" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <div className="mt-3 mb-5">
                                <h2>Chỉnh sửa thông tin máy in thành công!</h2>
                            </div>
                            <div className="m-2">
                                <button 
                                    className="btn btn-primary" 
                                    data-bs-dismiss="modal"
                                    onClick={handleViewInfoPrinter}
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
    )
}