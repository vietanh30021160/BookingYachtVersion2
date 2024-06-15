import React, { useState } from 'react';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import image from '../../assets/no53ab0y526yl825.webp';
import ModalUpdateInforyacht from './Modal/ModalUpdateInforyacht';
import Accordion from 'react-bootstrap/Accordion';

const ManageInforYacht = () => {
    const [isShowModal, setIsShowModal] = useState(false);
    const handleClose = () => {
        setIsShowModal(false);
    }
    return (
        <div>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Update Yacht</Accordion.Header>
                    <Accordion.Body>
                        <fieldset className="border rounded-3 p-3">
                            <legend className="float-none w-auto px-3">Update Yacht:</legend>
                            <p>Name:</p>

                            <Row>
                                <Col>
                                    <p>Launch:</p>

                                </Col>
                                <Col>

                                    <p>Intinerary:</p>
                                </Col>
                            </Row>

                            <p>Hull-Body:</p>
                            <p>Rule:</p>
                            <p>Description:</p>



                            <div className='my-3 text-center'>
                                <button className='btn btn-success' onClick={() => setIsShowModal(true)}>Update</button>
                            </div>

                            <ModalUpdateInforyacht
                                show={isShowModal}
                                handleClose={handleClose}
                            />
                        </fieldset>
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>



        </div>
    );
};

export default ManageInforYacht;