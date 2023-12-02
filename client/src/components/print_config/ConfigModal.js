import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ConfigModal({ file_name, state, submit_state, support_function }){
    return (
        <Modal show={state} onHide={support_function}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {!submit_state ? 'Chú ý' : 'Thông báo'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!submit_state ? 'Vui lòng điền đầy đủ thông tin!' : 'Đăng nhập thành công!'}
            </Modal.Body>
            <Modal.Footer>
                {!submit_state ? (
                    <Button variant="primary" onClick={support_function}>
                        OK
                    </Button>
                ) : (
                    <Link 
                        className = "btn btn-primary"
                        to='/print/confirm' 
                        state = {{ name: file_name }}
                    >
                        OK
                    </Link>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default ConfigModal;