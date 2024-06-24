import React, { useState, useEffect } from 'react';
import { Col, ListGroup, Modal, Row } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';
import Carousel from './Carousel';
import { getRoomById } from '../../../services/ApiServices';

const RoomDetailModal = ({ room, show, handleClose }) => {
    console.log(room)

    const [roomSelection, setRoomSelection] = useState();
    const getRoomByRoomId = async (roomId) => {
        const res = await getRoomById(roomId);
        setRoomSelection(res.data.data)
        console.log(res.data.data)
    }

    useEffect(() => {
        getRoomByRoomId(room.idRoom)
    }, [room.idRoom])

    if (!room) return null; // Return null if no room is selected
    const getImageApi = `http://localhost:8080/api/customer/file/`
    const utilities = room.roomType.utilities ? room.roomType.utilities.split('.').filter(sentence => sentence.trim()) : [];
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
                        <Carousel images={[room.image]} />
                    </Col>
                    <Col md={6}>
                        <h5 style={{ fontWeight: 'bold' }}>{roomSelection.name}</h5>

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