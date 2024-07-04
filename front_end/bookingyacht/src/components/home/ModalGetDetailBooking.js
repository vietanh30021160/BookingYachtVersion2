import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalGetDetailBooking = (props) => {
    const { show, onHide, bookingDetail } = props;


    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Booking Order Detail
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {bookingDetail ? (
                    <div>
                        <p><strong>ID Booking:</strong> {bookingDetail.idBooking}</p>
                        <p><strong>ID Booking:</strong> {bookingDetail.bookingTime}</p>
                        <p><strong>ID Booking:</strong> {bookingDetail.requirement}</p>
                        <p><strong>ID Booking:</strong> {bookingDetail.status}</p>
                        <p><strong>ID Booking:</strong> {bookingDetail.schedule.startDate}</p>
                        <p><strong>ID Booking:</strong> {bookingDetail.schedule.endDate}</p>
                        <p><strong>ID Booking:</strong> {bookingDetail.customerDTO.fullName}</p>
                        <p><strong>ID Booking:</strong> {bookingDetail.customerDTO.email}</p>
                        <p><strong>ID Booking:</strong> {bookingDetail.customerDTO.phone}</p>
                        <p><strong>ID Booking:</strong> {bookingDetail.customerDTO.address}</p>
                        <p><strong>ID Booking:</strong> {bookingDetail.yachtName}</p>
                        <p><strong>ID Booking:</strong> {bookingDetail.rooms.name}</p>
                        <p><strong>ID Booking:</strong> {bookingDetail.rooms.price}</p>
                        <p><strong>ID Booking:</strong> {bookingDetail.rooms.area}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalGetDetailBooking;