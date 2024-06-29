import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import ModalViewDetailBooking from './ModalViewDetailBooking';

const DecliledBooking = (props) => {
    const { listBooking } = props;
    const [isShowModalViewBooking, setIsShowModalViewBooking] = useState();

    const [bookingDetail, setBookingDetail] = useState({})

    const handleViewDetailBooking = (booking) => {
        setIsShowModalViewBooking(true);
        setBookingDetail(booking);
    }

    return (
        <div>
            {
                listBooking && listBooking.filter((b) => b.status === 'Confirmed').map((booking) =>

                    <div onClick={() => handleViewDetailBooking(booking)} style={{ cursor: 'pointer' }} className="card mb-4 order-list">
                        <div className="gold-members p-4">
                            <b href="#">
                            </b>
                            <div className="media">

                                <div className="media-body">
                                    <b href="#">
                                        <span className="float-right text-success">{booking.bookingTime}<i className="feather-check-circle text-success" /></span>
                                    </b>
                                    <h6 className="mb-3"><b href="#">
                                    </b><b href="detail.html" className="text-dark">{booking.customerName}</b>
                                    </h6>
                                    <p className="text-black-50 mb-1"><i className="feather-map-pin" /> {booking.yachtName}, Amount: {booking.amount}
                                    </p>
                                    <p className="text-black-50 mb-3"><i className="feather-list" /> Schedule - <i className="feather-clock ml-2" />Start Date: {booking.schedule.startDate}, End Date: {booking.schedule.endDate} </p>
                                    <p className="text-black-50 mb-3"><i className="feather-list" /> Requirement: <i className="feather-clock ml-2" />{booking.requirement}</p>

                                    <hr />
                                    <div className='action d-flex'>
                                        <p className="mb-0 text-dark text-dark pt-2"><span className="text-dark font-weight-bold"> Status :</span>
                                            {booking.status}
                                        </p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className='page'>
                <ReactPaginate
                    nextLabel="Next >"
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={3}
                    previousLabel="< Prev"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>
            <ModalViewDetailBooking
                show={isShowModalViewBooking}
                setIsShowModalViewBooking={setIsShowModalViewBooking}
                bookingDetail={bookingDetail}
            />
        </div>
    );
};

export default DecliledBooking;