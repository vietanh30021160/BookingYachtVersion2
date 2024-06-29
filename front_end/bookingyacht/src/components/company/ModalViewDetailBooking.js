import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap'
import _ from 'lodash';
import { PiEmptyBold } from "react-icons/pi";
const ModalViewDetailBooking = (props) => {
    const { show, setIsShowModalViewBooking, bookingDetail } = props;
    const [booking, setBooking] = useState({});

    const handleClose = () => {
        setIsShowModalViewBooking(false)
    }

    useEffect(() => {
        if (!_.isEmpty(bookingDetail) && show) {
            setBooking(bookingDetail);
        }
    }, [bookingDetail, show])


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
                    <Modal.Title>Booking Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <div
                        class="table-responsive"
                    >
                        <table
                            class="table table-striped table-hover table-borderless table-primary align-middle"
                        >
                            <thead class="table-light">

                                <tr>
                                    <th>Room Avatar</th>
                                    <th>Room Name</th>
                                    <th>Service</th>
                                    <th>Price Service</th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider">


                                {
                                    booking.rooms.map((room) =>
                                        <tr
                                            class="table-primary"
                                        >
                                            <td key={room.idRoom}>
                                                <img src={room.avatar === null ? '' : `http://localhost:8080/api/customer/file/${room.avatar}`} alt='Avatar' />
                                            </td>
                                            <td>{room.name || 'Not Exist'}</td>
                                        </tr>
                                    )

                                }
                                {
                                    booking.services.map((service) =>
                                        <tr>
                                            <td key={service.idService}>{service.service || <PiEmptyBold />}</td>
                                            <td>{service.price || 'Not Exist'}</td>
                                        </tr>
                                    )

                                }

                            </tbody>
                            <tfoot>

                            </tfoot>
                        </table>
                    </div> */}
                    <h5>Rooms</h5>
                    <ul>
                        {bookingDetail.rooms && bookingDetail.rooms.length > 0 ? (
                            bookingDetail.rooms.map((room, index) => (
                                <li key={index}>{room.name}</li>
                            ))
                        ) : (
                            <p>No rooms booked.</p>
                        )}
                    </ul>

                    <h5>Services</h5>
                    <ul>
                        {bookingDetail.services && bookingDetail.services.length > 0 ? (
                            bookingDetail.services.map((service, index) => (
                                <li key={index}> Service: {service.service} - Price: {service.price}</li>

                            ))
                        ) : (
                            <p>No services added.</p>
                        )}
                    </ul>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default ModalViewDetailBooking;