import React, { useState, useEffect } from 'react';
import { Col, ListGroup, Modal, Row } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';
import Carousel from './Carousel';
import { getRoomById } from '../../../services/ApiServices';

const RoomDetailModal = ({ selectedRoom, show, handleClose }) => {
    console.log(selectedRoom)

    // const [roomSelection, setRoomSelection] = useState();
    // const getRoomByRoomId = async (roomId) => {
    //     const res = await getRoomById(roomId);
    //     setRoomSelection(res.data.data)
    //     console.log(res.data.data)
    // }

    // useEffect(() => {
    //     getRoomByRoomId(selectedRoom.idRoom)
    // }, [selectedRoom])

    if (!selectedRoom) return null; // Return null if no room is selected
    const getImageApi = `http://localhost:8080/api/customer/file/`
    const utilities = selectedRoom.roomType.utilities ? selectedRoom.roomType.utilities.split('.').filter(sentence => sentence.trim()) : [];
    const renderUtilities = () => {
        return utilities.map((util, index) => {
            return (
                <ListGroup.Item key={index}><FaCheck /> {util}</ListGroup.Item>
            )
        })
    }
    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Body>
                <Row>
                    <Col md={6}>
                        <Carousel images={selectedRoom.roomImageSet} />
                    </Col>
                    <Col md={6}>
                        <h5 style={{ fontWeight: 'bold' }}>{selectedRoom.name}</h5>

                        <ListGroup variant="flush">
                            {renderUtilities()}
                        </ListGroup>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default RoomDetailModal;