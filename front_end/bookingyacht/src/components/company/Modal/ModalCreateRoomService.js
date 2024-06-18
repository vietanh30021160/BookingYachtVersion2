import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap'
const ModalCreateRoomService = (props) => {
    const { show, handleClose } = props;
    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                className='modal-add-new-yacht'
                autoFocus

            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Yacht</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} >
                                <Form.Label>Name Service</Form.Label>
                                <Form.Control type="text" placeholder="Name Yacht" />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text" placeholder="Price" />
                            </Form.Group>
                        </Row>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalCreateRoomService;