import React, { useEffect, useState } from 'react';
import './Company.scss';
import { Button, FormControl, FormGroup } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import './Company.scss'
import { useSelector } from 'react-redux';
import { canelBooking, conFirmBooking, confirmBooking, getBookingOrder } from '../../services/ApiServices';
import { toast } from 'react-toastify';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ConfirmedBooking from './ConfirmedBooking';
import DecliledBooking from './DecliledBooking';
import ModalViewDetailBooking from './ModalViewDetailBooking';
import { Link, NavLink } from 'react-router-dom';

const ViewBooking = () => {
    const idCompany = useSelector(state => state.account.account.idCompany);
    const [listBooking, setListBooking] = useState([]);
    const [isShowModalViewBooking, setIsShowModalViewBooking] = useState();

    const [bookingDetail, setBookingDetail] = useState({})
    useEffect(() => {
        getBooking();
    }, [])
    const getBooking = async () => {
        let res = await getBookingOrder(idCompany);
        if (res && res.data && res.data.data) {
            setListBooking(res.data.data);
        } else (
            toast.error('Not Found Booking')
        )
    }

    // console.log('book', listBooking)

    const handleViewDetailBooking = (booking) => {
        setIsShowModalViewBooking(true);
        setBookingDetail(booking);
    }

    // console.log('dd', listBooking)


    const handleConfrimBooking = async (idBooking) => {
        console.log('id', idBooking)
        let res = await confirmBooking(idCompany, idBooking);
        console.log('confim', res);
    }

    const handleCancelBooking = async (idBooking) => {
        console.log('id', idBooking)

        let res = await canelBooking(idCompany, idBooking);
        console.log('cancle', res);
    }

    return (
        <div className='container'>

            <div className='row'>

                <div className='row my-4'>
                    <h2 className='col-3'>Booking</h2>
                    <FormGroup className='col-4 d-flex'>
                        <FormControl placeholder='Search By Name Customer' type='text' />

                    </FormGroup>
                    <FormGroup className='col-2 d-flex'>
                        <FormControl placeholder='Search' type='date' />
                    </FormGroup>
                    <Button className=' col-2 btn btn-primary mx-3'>Search</Button>
                </div>
                <div className='row container'>
                    <div className="col-xl-12">
                        <Tabs
                            defaultActiveKey="Pending"
                            id="fill-tab-example"
                            className="mb-3"
                            fill
                        >
                            <Tab eventKey="Pending" title="Pending">
                                {
                                    listBooking && listBooking.filter((b) => b.status === 'Pending').map((booking) =>

                                        <div style={{ cursor: 'pointer' }} key={booking.idBooking} className="card mb-4 order-list">
                                            <div className="gold-members p-4">

                                                <div className="media">

                                                    <div className="media-body">
                                                        <b >
                                                            <span className="float-right text-success">{booking.bookingTime}<i className="feather-check-circle text-success" /></span>
                                                        </b>
                                                        <h6 className="mb-3"><b href="#">
                                                        </b><b className="text-dark">{booking.customerName}</b>
                                                        </h6>
                                                        <p className="text-black-50 mb-1"><i className="feather-map-pin" /> {booking.yachtName}, Amount: {booking.amount}
                                                        </p>
                                                        <p className="text-black-50 mb-1"><i className="feather-list" /> Schedule - <i className="feather-clock ml-2" />Start Date: {booking.schedule.startDate}, End Date: {booking.schedule.endDate} </p>
                                                        <p className="text-black-50 mb-3"><i className="feather-list" /> Requirement: <i className="feather-clock ml-2" />{booking.requirement}</p>

                                                        <hr />
                                                        <div className='action d-flex'>
                                                            <p className="mb-0 text-dark text-dark pt-2"><span className="text-dark font-weight-bold"> Status :</span>
                                                                {booking.status}
                                                            </p>
                                                            <div className="float-right">
                                                                <Link onClick={() => handleViewDetailBooking(booking)} className="btn btn-sm btn-warning"> View Detai </Link>
                                                                <Link onClick={() => handleConfrimBooking(booking.idBooking)} className="btn btn-sm btn-success"> Confirm </Link>
                                                                <Link onClick={() => handleCancelBooking(booking.idBooking)} className="btn btn-sm btn-danger"> Cancel</Link>
                                                            </div>
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
                                        // onPageChange=
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
                            </Tab>
                            <Tab eventKey="Confirmed" title="Confirmed">
                                <ConfirmedBooking
                                    listBooking={listBooking}
                                />
                            </Tab>
                            <Tab eventKey="Decliled" title="Decliled">
                                <DecliledBooking
                                    listBooking={listBooking}
                                />
                            </Tab>

                        </Tabs>
                    </div>

                </div>
                <ModalViewDetailBooking
                    show={isShowModalViewBooking}
                    setIsShowModalViewBooking={setIsShowModalViewBooking}
                    bookingDetail={bookingDetail}
                />
            </div >




        </div>
    );
};

export default ViewBooking;