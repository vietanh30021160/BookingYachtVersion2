import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeRoomAction } from '../../../redux/action/OrderAction';
import { useNavigate } from 'react-router-dom';
import { GoCheckCircle } from "react-icons/go";
import { getCustomerById, getPayment } from '../../../services/ApiServices';

const BookNowModal = ({
    selectedRooms,
    selectedServices,
    handleServiceChange,
    totalPrice,
    services,
    show,
    handleClose,
    selectedSchedule
}) => {
    const getAvatarApi = `http://localhost:8080/api/customer/file/`;
    const isLogged = useSelector(state => state.account.isAuthenticated);

    const [requirements, setRequirements] = useState('');
    const [urlPayment, setUrlPayment] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isLogged) {
            processPayment();
        } else {
            navigate('/signin');
        }
    };

    const handleOnChange = (event) => {
        setRequirements(event.target.value);
    };

    const { idCustomer } = useSelector(state => state.account.account);
    const [customer, setCustomer] = useState();

    useEffect(() => {
        const getCustomer = async () => {
            try {
                const res = await getCustomerById(idCustomer);
                setCustomer(res.data.data);
            } catch (error) {
                console.error('Error fetching customer:', error);
            }
        };
        if (idCustomer) {
            getCustomer();
        }
    }, [idCustomer]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemoveRoom = (room) => {
        dispatch(removeRoomAction(room));
    };

    const getSelectedRoomIds = () => {
        return selectedRooms.map(room => room.idRoom);
    };

    const getSelectedServiceIds = () => {
        let serviceIds = [];
        for (const roomId in selectedServices) {
            serviceIds = [...serviceIds, ...selectedServices[roomId]];
        }
        return serviceIds;
    };

    const processPayment = async () => {
        const roomIds = getSelectedRoomIds();
        const serviceIds = getSelectedServiceIds();
        console.log('roomid:', roomIds, 'serverviceid:', serviceIds, 'requirements:', requirements, 'customer:', idCustomer, 'schedule:', selectedSchedule)
        try {
            const res = await getPayment(roomIds, serviceIds, requirements, idCustomer, selectedSchedule);
            console.log(res);
            setUrlPayment(res.data.data);
            console.log('url', res.data.data);
            window.location.href = res.data.data;
            // window.open(urlPayment, '_blank')
        } catch (error) {
            console.error('Error fetching payment:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton style={{ backgroundColor: 'orange' }}>
                <Modal.Title className='fw-bold'>Đặt Phòng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedRooms.map(room => (
                    <Row key={room.idRoom} className="my-3 p-3 border rounded border-warning align-items-center">
                        <Col md={2}>
                            <img src={`${getAvatarApi}${room.avatar}`} alt={room.name} className="img-fluid rounded" />
                        </Col>
                        <Col md={5}>
                            <h5 className='fw-bold'>{room.name}</h5>
                            <div>
                                {selectedServices[room.idRoom] && selectedServices[room.idRoom].map(serviceId => {
                                    console.log(selectedServices[room.idRoom]);

                                    const service = services.find(s => s.idService === serviceId);
                                    console.log('service', services);
                                    return (
                                        <div key={serviceId} className="d-flex justify-content-between align-items-center mb-2">
                                            <span style={{ color: 'black', fontSize: '14px' }}>{service ? service.service : ''} {service.price.toLocaleString()} đ</span>
                                            <Button variant="danger" size="sm" onClick={() => handleServiceChange(room.idRoom, serviceId)}>Xóa</Button>
                                        </div>
                                    );
                                })}
                            </div>
                        </Col>
                        <Col md={3}>
                            <h6 className='fw-bold'>Giá Phòng</h6>
                            <h5>{room.roomType.price.toLocaleString()} đ</h5>
                        </Col>
                        <Col md={2} className="d-flex align-items-center justify-content-end">
                            <Button onClick={() => handleRemoveRoom(room)} className='btn btn-danger'>Hủy</Button>
                        </Col>
                    </Row>
                ))}
                <Form id="bookingForm" onSubmit={handleSubmit}>
                    <Form.Group controlId="formName" className="mb-3">
                        <Form.Label>Họ và tên</Form.Label>
                        <Form.Control type="text" placeholder="Nhập họ và tên" readOnly value={customer ? customer.fullName : ''} />
                    </Form.Group>
                    <Form.Group controlId="formPhone" className="mb-3">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control type="text" placeholder="Nhập số điện thoại" readOnly value={customer ? customer.phone : ''} />
                    </Form.Group>
                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Địa chỉ email</Form.Label>
                        <Form.Control type="email" placeholder="Nhập email" readOnly value={customer ? customer.email : ''} />
                    </Form.Group>
                    <Form.Group controlId="formRequests" className="mb-3">
                        <Form.Label>Yêu cầu của bạn</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Nhập yêu cầu của bạn" value={requirements} onChange={handleOnChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <h5 className="me-auto">Tổng tiền: {totalPrice.toLocaleString()} đ</h5>
                <Button variant="secondary" onClick={handleClose}>Đóng</Button>
                <Button variant='warning' type="submit" form="bookingForm"><GoCheckCircle style={{ marginRight: '5px' }} />Đặt ngay</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BookNowModal;
