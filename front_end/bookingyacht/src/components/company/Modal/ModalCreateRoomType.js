import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { createRoomType } from '../../../services/ApiServices';
import { toast } from 'react-toastify';

const ModalCreateRoomType = (props) => {
    const { show, setIsShowModalCreateRoomType } = props;

    const [price, setPrice] = useState(0);
    const [type, setType] = useState(0);
    const [utilities, setUtilities] = useState('');

    const handleClose = () => {
        setPrice('');
        setType('');
        setUtilities('');
        setIsShowModalCreateRoomType(false);
    }

    const handleCreateRoomType = async () => {
        if (!price && !type && !utilities) {
            toast.error('Input Not Empty')
        } else {
            let res = await createRoomType(price, type, utilities);
            if (res && res.data.data === true) {
                toast.success('Create Successfully')
                await props.getRoomType();
                handleClose();
            } else {
                toast.error('Create Fail')
            }
        }
    }

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
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    onChange={event => setPrice(event.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} >
                                <Form.Label>Type</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder='Number'
                                    onChange={event => setType(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Utilities</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={event => setUtilities(event.target.value)}
                                />
                            </Form.Group>
                        </Row>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateRoomType}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ModalCreateRoomType;