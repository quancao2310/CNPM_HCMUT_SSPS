import { useState } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';

export default function Searchbar() {
    const [alertState, setAlertState] = useState(false)
    const handleAlert = () => {
        setAlertState(true);
    }
    const handleHideAlert = () => {
        setAlertState(false);
    }
    const [openFormModal, setOpenFormModal] = useState(false)
    const handleOpenFormModal = () => {
        setOpenFormModal(true);
    }
    const handleCloseFormModal = () => {
        setOpenFormModal(false);
        handleHideAlert()
    }
    const [openAlertModal, setOpenAlertModal] = useState(false)
    const handleOpenAlertModal = () => {
        setOpenAlertModal(true);
    }
    const handleCloseAlertModal = () => {
        setOpenAlertModal(false);
    }
    const handleInput = () => {
        const newPrinterData = {
            name: document.getElementById("new_printer_name").value,
            brand: document.getElementById("new_printer_brand").value,
            model: document.getElementById("new_printer_model").value,
            description: document.getElementById("new_printer_description").value,
            loc_campus: document.getElementById("campus").value,
            loc_building: document.getElementById("new_printer_building").value,
            loc_room: document.getElementById("new_printer_room").value,
            status: document.getElementById("status").value
        };
        const hasEmptyValue = Object.values(newPrinterData).some(value => (value === ""));
        if (hasEmptyValue) {
            handleAlert()
        } else {
            handleHideAlert()
            handleCloseFormModal()
            handleOpenAlertModal()
            axios
            .post(`${process.env.REACT_APP_SERVER_URL}/printer/add`, newPrinterData)
            .then((response) => {
                console.log(response.data)
            })
            .catch((err) => {
                console.error(err);
            });        
        }
    } 

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
                                onClick={handleOpenFormModal}
                            >
                                Thêm máy in
                            </button>
                            <Modal
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                                show={openFormModal}
                                onHide={handleCloseFormModal}
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
                                        className="btn btn-secondary"
                                        onClick={handleCloseFormModal}
                                    >
                                        Hủy
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-primary"
                                        onClick={handleInput}
                                    >
                                        Thêm máy in
                                    </button>
                                </Modal.Footer>
                            </Modal>
                            <Modal
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                                show={openAlertModal}
                                onHide={handleCloseAlertModal}
                            >
                                <Modal.Body>
                                    <div className="mt-3 mb-5 text-center">
                                        <h2>Thêm máy in thành công!</h2>
                                    </div>
                                    <div className="m-2 text-center">
                                        <button 
                                            className="btn btn-primary" 
                                            onClick={handleCloseAlertModal}
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