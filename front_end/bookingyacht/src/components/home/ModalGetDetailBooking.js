import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalGetDetailBooking = (props) => {
    const { show, onHide, bookingOrderDetail } = props;

    const formatAmount = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero indexed
        const year = date.getFullYear();
        return `${hours}:${minutes} ${day}/${month}/${year}`;
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Booking Order Detail
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {bookingOrderDetail ? (
                    <div>
                        <p><strong>ID Booking:</strong> {bookingOrderDetail.idBooking}</p>
                        <p><strong>Booking Time:</strong> {formatDateTime(bookingOrderDetail.bookingTime)}</p>
                        <p><strong>Amount:</strong> {formatAmount(bookingOrderDetail.amount)} VND</p>
                        <p><strong>Requirement:</strong> {bookingOrderDetail.requirement}</p>
                        <p><strong>Status:</strong> {bookingOrderDetail.status}</p>
                        <p><strong>Yacht name:</strong> {bookingOrderDetail.yachtName}</p>
                        <p><strong>Start date:</strong> {formatDateTime(bookingOrderDetail.schedule.startDate)}</p>
                        <p><strong>End date:</strong> {formatDateTime(bookingOrderDetail.schedule.endDate)}</p>
                        <p><strong>Customer information:</strong></p>
                        <ul>
                            <li>
                                <p><strong>Full name:</strong> {bookingOrderDetail.customerDTO.fullName}</p>
                                <p><strong>Email:</strong> {bookingOrderDetail.customerDTO.email}</p>
                                <p><strong>Phone number:</strong> {bookingOrderDetail.customerDTO.phone}</p>
                                <p><strong>Address:</strong> {bookingOrderDetail.customerDTO.address}</p>
                            </li>
                        </ul>
                        <p><strong>Rooms:</strong></p>
                        <ul>
                            {bookingOrderDetail.rooms.map(room => (
                                <li key={room.idRoom}>
                                    <p><strong>Room:</strong> {room.name}</p>
                                    <p><strong>Price:</strong> {formatAmount(room.price)} VND</p>
                                    <p><strong>Area:</strong> {room.area}</p>
                                </li>
                            ))}
                        </ul>
                        <p><strong>Services:</strong></p>
                        <ul>
                            {bookingOrderDetail.services.map(service => (
                                <li key={service.idService}>
                                    <p><strong>Service:</strong> {service.service}</p>
                                    <p><strong>Price:</strong> {formatAmount(service.price)} VND</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal.Body>
            <Modal.Footer style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalGetDetailBooking;