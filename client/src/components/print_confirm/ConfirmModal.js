import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ConfirmModal({ state, confirm_state, campus, room }){
    return (
        <Modal show={state}>
            <Modal.Header>
                <Modal.Title>
                    Thông báo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {confirm_state? `Đặt in thành công! Vui lòng lấy tài liệu của bạn tại ${campus}, Phòng ${room}`:'Số dư của bạn không đủ! Vui lòng nạp thêm!'}
            </Modal.Body>
            <Modal.Footer>
                <Link 
                    className = "btn btn-primary"
                    to = {confirm_state?'/print/status':'/buy'}
                >
                    OK
                </Link>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmModal;