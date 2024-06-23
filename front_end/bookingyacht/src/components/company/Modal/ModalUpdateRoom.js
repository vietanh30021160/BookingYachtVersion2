import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
const ModalUpdateRoom = (props) => {
    const { show, handleClose, idRoom } = props;

    return (
        <div>
            <Modal size='xl' show={show} onHide={handleClose} autoFocus>
                <Modal.Header closeButton>
                    <Modal.Title>Update Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder='Name room' />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Area</Form.Label>
                                <Form.Control type="text" placeholder='Area' />
                            </Form.Group>
                        </Row>

                        <FloatingLabel controlId="floatingTextarea2" label="Description">
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>


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

export default ModalUpdateRoom;