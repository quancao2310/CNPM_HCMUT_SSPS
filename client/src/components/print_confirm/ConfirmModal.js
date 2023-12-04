import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ConfirmModal({ state }){
    return (
        <Modal show={state}>
            <Modal.Header>
                <Modal.Title>
                    Thông báo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Đặt in thành công!
            </Modal.Body>
            <Modal.Footer>
                <Link 
                    className = "btn btn-primary"
                    to = '/print/status'
                >
                    OK
                </Link>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmModal;