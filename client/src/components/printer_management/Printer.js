import {useState, useEffect} from 'react' 
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'

export default function Printer(props) {
    const [printer, setPrinter] = useState({});

    const [infoModal, setInfoModal] = useState(false)
    const handleOpenInfoModal = () => {
        setInfoModal(true)
    }
    const handleCloseInfoModal = () => {
        setInfoModal(false)
    }

    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)
    const handleOpenConfirmDeleteModal = () => {
        setConfirmDeleteModal(true)
    }
    const handleCloseConfirmDeleteModal = () => {
        setConfirmDeleteModal(false)
    }

    const [deleteSuccessModal, setDeleteSuccessModal] = useState(false)
    const handleOpenDeleteSuccessModal = () => {
        setDeleteSuccessModal(true)
    }
    const handleCloseDeleteSuccessModal = () => {
        setDeleteSuccessModal(false)
    }

    const [confirmOnModal, setConfirmOnModal] = useState(false)
    const handleOpenConfirmOnModal = () => {
        setConfirmOnModal(true)
    }
    const handleCloseConfirmOnModal = () => {
        setConfirmOnModal(false)
    }

    const [onSuccessModal, setOnSuccessModal] = useState(false)
    const handleOpenOnSuccessModal = () => {
        setOnSuccessModal(true)
    }
    const handleCloseOnSuccessModal = () => {
        setOnSuccessModal(false)
    }

    const [confirmOffModal, setConfirmOffModal] = useState(false)
    const handleOpenConfirmOffModal = () => {
        setConfirmOffModal(true)
    }
    const handleCloseConfirmOffModal = () => {
        setConfirmOffModal(false)
    }

    const [offSuccessModal, setOffSuccessModal] = useState(false)
    const handleOpenOffSuccessModal = () => {
        setOffSuccessModal(true)
    }
    const handleCloseOffSuccessModal = () => {
        setOffSuccessModal(false)
    }

    const [updateSuccessModal, setUpdateSuccessModal] = useState(false)
    const handleOpenUpdateSuccessModal = () => {
        setUpdateSuccessModal(true)
    }
    const handleCloseUpdateSuccessModal = () => {
        setUpdateSuccessModal(false)
    }

    useEffect(
        () => {
            axios
                .get(`${process.env.REACT_APP_SERVER_URL}/printer/getInfoPrinter/${props.id}`)
                .then((response) => {
                    setPrinter(response.data[0])
                })
                .catch((err) => {
                    console.error(err);
                });
        }, []
    )
    const [alertState, setAlertState] = useState(false)
    const handleAlert = () => {
        setAlertState(true);
    }
    const handleHideAlert = () => {
        setAlertState(false);
    }

    const [isDisabled, setIsDisabled] = useState(true)

    const handleUpdateInfoPrinter = () => {
        setIsDisabled(false)

        document.getElementById("update").style.display = "none"
        document.getElementById("delete").style.display = "none"
        document.getElementById("on").style.display = "none"
        document.getElementById("off").style.display = "none"

        document.getElementById("updateConfirm").style.display = ""
        document.getElementById("updateCancel").style.display = ""

    }

    const handleUpdate = () => {
        
        const editPrinterData = {
            printer_id: props.id,
            name: document.getElementById(`name${props.id}`).value,
            brand: document.getElementById(`brand${props.id}`).value,
            model: document.getElementById(`model${props.id}`).value,
            description: document.getElementById(`description${props.id}`).value,
            loc_campus: document.getElementById(`campus${props.id}`).value,
            loc_building: document.getElementById(`building${props.id}`).value,
            loc_room: document.getElementById(`room${props.id}`).value,
            status: document.getElementById(`status${props.id}`).value
        };
        
        const hasEmptyValue = Object.values(editPrinterData).some(value => (value === ""));
        if (hasEmptyValue) {
            handleAlert()
        } else {
            handleHideAlert()
            handleOpenUpdateSuccessModal()
            axios
            .put(`${process.env.REACT_APP_SERVER_URL}/printer/edit/${props.id}`, editPrinterData)
            .then((response) => {
                console.log(response.data)
            })
            .catch((err) => {
                console.error(err);
            });        
        }
    }

    const handleDelete = () => {
        handleCloseConfirmDeleteModal()
        handleOpenDeleteSuccessModal()
        axios
            .put(`${process.env.REACT_APP_SERVER_URL}/printer/delete/${props.id}`)
            .then((response) => {
                console.log(response.data)
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const handleEnable = () => {
        handleCloseConfirmOnModal()
        handleOpenOnSuccessModal()
        axios
            .put(`${process.env.REACT_APP_SERVER_URL}/printer/enable/${props.id}`)
            .then((response) => {
                console.log(response.data)
            })
            .catch((err) => {
                console.error(err);
            });

        document.getElementById("delete").disabled = true
        document.getElementById("on").disabled = true
        document.getElementById("off").disabled = false

        document.getElementById(`status${props.id}`).value = "running"
    }

    const handleDisable = () => {
        handleCloseConfirmOffModal()
        handleOpenOffSuccessModal()
        axios
            .put(`${process.env.REACT_APP_SERVER_URL}/printer/disable/${props.id}`)
            .then((response) => {
                console.log(response.data)
            })
            .catch((err) => {
                console.error(err);
            });

        document.getElementById("delete").disabled = false
        document.getElementById("on").disabled = false
        document.getElementById("off").disabled = true

        document.getElementById(`status${props.id}`).value = "disabled"
    }

    const handleViewInfoPrinter = () => {
        document.getElementById("update").style.display = ""
        document.getElementById("delete").style.display = ""
        document.getElementById("on").style.display = ""
        document.getElementById("off").style.display = ""

        document.getElementById("updateConfirm").style.display = "none"
        document.getElementById("updateCancel").style.display = "none"

        handleSetDisabled()

        document.getElementById(`name${props.id}`).value = printer.name
        document.getElementById(`brand${props.id}`).value = printer.brand
        document.getElementById(`model${props.id}`).value = printer.model
        document.getElementById(`description${props.id}`).value = printer.description
        document.getElementById(`campus${props.id}`).value = printer.loc_campus
        document.getElementById(`building${props.id}`).value = printer.loc_building
        document.getElementById(`room${props.id}`).value = printer.loc_room
        document.getElementById(`status${props.id}`).value = printer.status
    }

    const handleSetDisabled = () => {
        setIsDisabled(true)
    }

    function handleDisablePrinter() {
        var status = document.getElementById("status" + props.id).value

        if (status === "running") {
            document.getElementById("delete").disabled = true
            document.getElementById("on").disabled = true
            document.getElementById("off").disabled = false
        }
        if (status === "disabled") {
            document.getElementById("delete").disabled = false
            document.getElementById("on").disabled = false
            document.getElementById("off").disabled = true
        }
    }

    const handleAfterUpdate = () => {
        handleCloseUpdateSuccessModal()
        document.getElementById("update").style.display = ""
        document.getElementById("delete").style.display = ""
        document.getElementById("on").style.display = ""
        document.getElementById("off").style.display = ""

        document.getElementById("updateConfirm").style.display = "none"
        document.getElementById("updateCancel").style.display = "none"

        handleSetDisabled()
        
        document.getElementById(`name${props.id}`).defaultValue = document.getElementById(`name${props.id}`).value
        document.getElementById(`brand${props.id}`).defaultValue = document.getElementById(`brand${props.id}`).value
        document.getElementById(`model${props.id}`).defaultValue = document.getElementById(`model${props.id}`).value
        document.getElementById(`description${props.id}`).defaultValue = document.getElementById(`description${props.id}`).value
        document.getElementById(`campus${props.id}`).defaultValue = document.getElementById(`campus${props.id}`).value
        document.getElementById(`building${props.id}`).defaultValue = document.getElementById(`building${props.id}`).value
        document.getElementById(`room${props.id}`).defaultValue = document.getElementById(`room${props.id}`).value
        document.getElementById(`status${props.id}`).defaultValue = document.getElementById(`status${props.id}`).value
    }

    return (
        <div>
            <div className="text-center">
                <img 
                    src="https://www.xerox.com/assets/images/brand_engine/products/hardware/ALB81XX/hero_960x960.png" 
                    alt="printer"
                    style={{
                        width: "190px"
                    }}
                />
                <button 
                    type="button" 
                    className="btn btn-primary mt-1"
                    onClick={handleOpenInfoModal}
                >
                    {props.name}
                </button>
            </div>
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                id="infoPrinterForm"
                centered
                show={infoModal}
                onHide={() => {
                    handleCloseInfoModal()
                    handleViewInfoPrinter()
                }}
            >
                <Modal.Header closeButton>
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Thông tin máy in</h1>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="row mt-1 mb-1">
                            <div className="col-4 mt-2">
                                Tên máy in:
                            </div>
                            <div className="col">
                                <input className="form-control" type="text" defaultValue={printer.name} autoComplete={props.name} id={"name" + props.id} disabled={isDisabled}/>
                            </div>
                        </div>
                        <div className="row mt-1 mb-1">
                            <div className="col-4 mt-2">
                                Hãng sản xuất:
                            </div>
                            <div className="col">
                                <input className="form-control" type="text" defaultValue={printer.brand} id={"brand" + props.id} disabled={isDisabled}/>
                            </div>
                        </div>
                        <div className="row mt-1 mb-1">
                            <div className="col-4 mt-2">
                                Loại máy in:
                            </div>
                            <div className="col">
                                <input className="form-control" type="text" defaultValue={printer.model} id={"model" + props.id} disabled={isDisabled}/>
                            </div>
                        </div>
                        <div className="row mt-1 mb-1">
                            <div className="col-4 mt-2">
                                Mô tả:
                            </div>
                            <div className="col">
                                <textarea className="form-control" type="text" defaultValue={printer.description} id={"description" + props.id} disabled={isDisabled}/>
                            </div>
                        </div>
                        <div className="row mt-1 mb-1">
                            <div className="col-2 mt-2">
                                Vị trí:
                            </div>
                            <div className="col mt-2">
                                <div>
                                    Cơ sở: 
                                    <select name="campus" id={"campus" + props.id} className="form-control" disabled={isDisabled} defaultValue={printer.loc_campus}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>    
                                </div>
                            </div>
                            <div className="col mt-2">
                                Tòa: 
                                <input className="form-control" type="text" defaultValue={printer.loc_building} id={"building" + props.id} disabled={isDisabled}/>
                            </div>
                            <div className="col mt-2">
                                Phòng: 
                                <input className="form-control" type="text" defaultValue={printer.loc_room} id={"room" + props.id} disabled={isDisabled}/>
                            </div>
                        </div>
                        <div className="row mt-1 mb-1">
                            <div className="col-4 mt-2">
                                Trạng thái:
                            </div>
                            <div className="col">
                                <select name="status" id={"status" + props.id} className="form-control" disabled={isDisabled} onChange={handleDisablePrinter} defaultValue={printer.status}>
                                    <option value="running">Đang hoạt động</option>
                                    <option value="disabled">Đang tắt</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={`alert alert-danger ${alertState?'':'d-none'}`} role="alert">
                        Vui lòng điền đầy đủ thông tin máy in!
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button 
                        type="button" 
                        className="btn btn-primary" 
                        id="update" 
                        onClick={handleUpdateInfoPrinter}
                    >
                        Sửa thông tin
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-secondary" 
                        id="delete" 
                        onClick={handleOpenConfirmDeleteModal} 
                        disabled={(printer.status === 'running')?true:false}
                    >
                        Xóa
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-success" 
                        id="on" 
                        onClick={handleOpenConfirmOnModal} 
                        disabled={(printer.status === 'running')?true:false}
                    >
                        Kích hoạt
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-danger" 
                        id="off" 
                        onClick={handleOpenConfirmOffModal} 
                        disabled={(printer.status === 'running')?false:true}
                    >
                        Vô hiệu hóa
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-secondary" 
                        id="updateCancel" 
                        style={{
                            display: "none"
                        }} 
                        onClick={handleViewInfoPrinter}
                    >
                        Hủy
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-primary" 
                        id="updateConfirm" 
                        onClick={handleUpdate} 
                        style={{
                            display: "none"
                        }}
                    >
                        Xác nhận
                    </button>
                </Modal.Footer>
            </Modal>
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={confirmDeleteModal}
            >
                <Modal.Body>
                    <div className="mt-3 mb-5 text-center">
                        <h2>{"Xác nhận xóa máy in " + props.id + "?"}</h2>
                    </div>
                    <div className="m-2 text-center">
                        <button 
                            className="btn btn-secondary" 
                            onClick={handleCloseConfirmDeleteModal}
                            style={{
                                width: 100,
                                marginRight: 30
                            }}
                        >
                            Hủy
                        </button>
                        <button 
                            className="btn btn-primary" 
                            onClick={handleDelete}
                            style={{
                                width: 100,
                                marginLeft: 30
                            }}
                        >
                            Xóa
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={deleteSuccessModal}
                onHide={handleCloseDeleteSuccessModal}
            >
                <Modal.Body>
                    <div className="mt-3 mb-5 text-center">
                        <h2>Xóa máy in thành công!</h2>
                    </div>
                    <div className="m-2 text-center">
                        <button 
                            className="btn btn-primary" 
                            onClick={() => {
                                handleCloseDeleteSuccessModal()
                                handleCloseInfoModal()
                                window.location.reload()
                            }}
                            style={{
                                width: 100
                            }}
                        >
                            OK
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={confirmOnModal}
            >
                <Modal.Body>
                    <div className="mt-3 mb-5 text-center">
                        <h2>{"Xác nhận kích hoạt máy in " + props.id + "?"}</h2>
                    </div>
                    <div className="m-2 text-center">
                        <button 
                            className="btn btn-secondary" 
                            onClick={handleCloseConfirmOnModal}
                            style={{
                                width: 100,
                                marginRight: 30
                            }}
                        >
                            Hủy
                        </button>
                        <button 
                            className="btn btn-success" 
                            onClick={handleEnable}
                            style={{
                                width: 100,
                                marginLeft: 30
                            }}
                        >
                            Kích hoạt
                        </button>
                    </div>
                </Modal.Body>
            </Modal> 
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={onSuccessModal}
                onHide={handleCloseOnSuccessModal}
            >
                <Modal.Body>
                    <div className="mt-3 mb-5 text-center">
                        <h2>Kích hoạt máy in thành công!</h2>
                    </div>
                    <div className="m-2 text-center">
                        <button 
                            className="btn btn-primary" 
                            onClick={() => {
                                handleCloseOnSuccessModal()
                                window.location.reload()
                            }}
                            style={{
                                width: 100
                            }}
                        >
                            OK
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={confirmOffModal}
            >
                <Modal.Body>
                    <div className="mt-3 mb-5 text-center">
                        <h2>{"Xác nhận vô hiệu hóa máy in " + props.id + "?"}</h2>
                    </div>
                    <div className="m-2 text-center">
                        <button 
                            className="btn btn-secondary" 
                            onClick={handleCloseConfirmOffModal}
                            style={{
                                width: 100,
                                marginRight: 30
                            }}
                        >
                            Hủy
                        </button>
                        <button 
                            className="btn btn-danger" 
                            onClick={handleDisable}
                            style={{
                                width: 150,
                                marginLeft: 30
                            }}
                        >
                            Vô hiệu hóa
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={offSuccessModal}
                onHide={handleCloseOffSuccessModal}
            >
                <Modal.Body>
                    <div className="mt-3 mb-5 text-center">
                        <h2>Vô hiệu hóa máy in thành công!</h2>
                    </div>
                    <div className="m-2 text-center">
                        <button 
                            className="btn btn-primary" 
                            onClick={() => {
                                handleCloseOffSuccessModal()
                                window.location.reload()
                            }}
                            style={{
                                width: 100
                            }}
                        >
                            OK
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={updateSuccessModal}
                onHide={handleCloseUpdateSuccessModal}
            >
                <Modal.Body>
                    <div className="mt-3 mb-5 text-center">
                        <h2>Chỉnh sửa thông tin máy in thành công!</h2>
                    </div>
                    <div className="m-2 text-center">
                        <button 
                            className="btn btn-primary" 
                            onClick={() => {
                                handleAfterUpdate()
                                window.location.reload()
                            }}
                            style={{
                                width: 100
                            }}
                        >
                            OK
                        </button>
                    </div>
                </Modal.Body>
            </Modal> 
        </div>
    )
}