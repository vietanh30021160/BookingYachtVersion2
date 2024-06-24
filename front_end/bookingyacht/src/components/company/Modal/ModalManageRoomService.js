import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, ButtonGroup, FormControl } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import { FaCirclePlus } from "react-icons/fa6";
import '../ManageYacht.scss'
import image from '../../../assets/no53ab0y526yl825.webp'
import { Link } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ModalCreateRoomService from './ModalCreateRoomService';
const ModalManageRoomService = (props) => {
    const { show, setIsShowModalRoomService } = props;
    const [isShowModal, setIsShowModal] = useState(false);
    const handleClose = () => {
        setIsShowModalRoomService(false);
    }
    const handleCloseCreate = () => {
        setIsShowModal(false);
    }
    return (
        <div>
            <Modal size='xl'
                show={show}
                onHide={handleClose}
                backdrop="static"
                className='modal-add-new-yacht'
                autoFocus

            >
                <Modal.Header closeButton>
                    <Modal.Title>Manage Room Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Button onClick={() => setIsShowModal(true)} className='my-2'>Add Room</Button>

                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>Name Services</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Dj TILO</td>
                                <td>
                                    5m
                                </td>

                            </tr>

                        </tbody>
                    </Table>

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

            <ModalCreateRoomService
                show={isShowModal}
                handleClose={handleCloseCreate}
            />
        </div>
    );
};

export default ModalManageRoomService;