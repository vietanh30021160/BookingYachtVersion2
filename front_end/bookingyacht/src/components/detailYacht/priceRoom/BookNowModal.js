import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeRoomAction } from '../../../redux/action/OrderAction';
import { useNavigate } from 'react-router-dom';
import { GoCheckCircle } from "react-icons/go";

const BookNowModal = ({
    selectedRooms,
    selectedServices,
    handleServiceChange,
    totalPrice,
    services,
    show,
    handleClose }) => {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const getAvatarApi = `http://localhost:8080/api/customer/file/`

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleRoveRoom = (room) => {
        dispatch(removeRoomAction(room));
    }
    const isLogged = useSelector(state => state.account.isAuthenticated);
    const handleLoginOrNot = () => {
        if (isLogged) {
            handleClose();
        } else {
            navigate('/signin')
        }
    }
    console.log(selectedServices)
    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton style={{ backgroundColor: 'orange' }}>
                <Modal.Title className='fw-bold'>Đặt Phòng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedRooms.map(room => (
                    <Row key={room.id} className="my-3 p-3 border rounded border-warning align-items-center">
                        <Col md={2}>
                            <img src={`${getAvatarApi}${room.avatar}`} alt={room.name} className="img-fluid rounded" />
                        </Col>
                        <Col md={5}>
                            <h5 className='fw-bold'>{room.name}</h5>
                            <div>
                                {selectedServices[room.idRoom] && selectedServices[room.idRoom].map(serviceId => {
                                    console.log(selectedServices[room.idRoom])

                                    const service = services.find(s => s.idService === serviceId);
                                    console.log('service', services)
                                    return (
                                        <div key={serviceId} className="d-flex justify-content-between align-items-center mb-2">
                                            <span style={{ color: 'black', fontSize: '14px' }}>{service ? service.service : ''} {service.price.toLocaleString()} đ</span>
                                            <Button variant="danger" size="sm" onClick={() => handleServiceChange(room.idRoom, serviceId)}>Xóa</Button>
                                        </div>
                                    );
                                })}
                            </div>
                        </Col>
                        <Col md={3} className="">
                            <h6 className='fw-bold'>Giá Phòng</h6>
                            <h5>{room.roomType.price.toLocaleString()} đ</h5>
                        </Col>
                        <Col md={2} className="d-flex align-items-center justify-content-end">
                            <button onClick={() => handleRoveRoom(room)} className='btn btn-danger'>Hủy</button>
                        </Col>
                    </Row>
                ))}
                <Form>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Họ và tên</Form.Label>
                        <Form.Control type="text" placeholder="Nhập họ và tên" />
                    </Form.Group>
                    <Form.Group controlId="formPhone" className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control type="text" placeholder="Nhập số điện thoại" />
                    </Form.Group>
                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Địa chỉ email</Form.Label>
                        <Form.Control type="email" placeholder="Nhập email" />
                    </Form.Group>
                    <Form.Group controlId="formRequests" className="mb-3">
                        <Form.Label>Yêu cầu của bạn</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Nhập yêu cầu của bạn" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <h5 className="me-auto">Tổng tiền: {totalPrice.toLocaleString()} đ</h5>
                <Button variant="secondary" onClick={handleClose}>Đóng</Button>

                <Button variant='warning' onClick={() => { handleLoginOrNot() }}><GoCheckCircle style={{ marginRight: '5px' }} />Đặt ngay</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BookNowModal;