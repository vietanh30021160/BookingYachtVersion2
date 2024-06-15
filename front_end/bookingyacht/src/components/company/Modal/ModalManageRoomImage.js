import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, ButtonGroup, FormControl } from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import { FaCirclePlus } from "react-icons/fa6";
import '../ManageYacht.scss'
import image from '../../../assets/no53ab0y526yl825.webp'
import { Link } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const ModalManageRoomImage = (props) => {
    const { show, handleClose } = props;

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
                    <label className='form-label label-upload' htmlFor='labelUpload'> <FaCirclePlus /> Upload File IMAGE</label>
                    <input
                        type='file'
                        hidden id='labelUpload'

                    />
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><img src={image} alt='image' width={200} /></td>
                                <td>
                                    <ButtonGroup className='d-flex ' style={{ gap: 30, justifyContent: "center", marginTop: 54 }}>
                                        <label htmlFor='buttonlUpload' className='btn btn-light'><FaPen size='1em' /></label>
                                        <input type='file'
                                            hidden id='buttonlUpload'
                                        />
                                        <Button className='btn btn-light' style={{ color: "red" }}><MdDelete size='1em' /></Button>
                                    </ButtonGroup>
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
        </div>
    );
};

export default ModalManageRoomImage;