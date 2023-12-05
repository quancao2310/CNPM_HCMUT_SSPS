import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ConfirmModal({ state, confirm_state }){
    return (
        <Modal show={state}>
            <Modal.Header>
                <Modal.Title>
                    Thông báo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {confirm_state? 'Đặt in thành công!':'Số dư của bạn không đủ! Vui lòng nạp thêm!'}
            </Modal.Body>
            <Modal.Footer>
                <Link 
                    className = "btn btn-primary"
                    to = {confirm_state?'/print/status':'/purchase'}
                >
                    OK
                </Link>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmModal;