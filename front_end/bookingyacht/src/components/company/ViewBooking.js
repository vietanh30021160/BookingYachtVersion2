import React from 'react';
import './Company.scss';
import { Button, FormControl, FormGroup } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import './Company.scss'

const ViewBooking = () => {
    return (
        <>

            <h2>Booking</h2>
            <div className='row'>

                <div className='row my-4'>
                    <h2 className='col-3'>Booking</h2>
                    <FormGroup className='col-4 d-flex'>
                        <FormControl placeholder='Search' type='text' />

                    </FormGroup>
                    <FormGroup className='col-2 d-flex'>
                        <FormControl placeholder='Search' type='date' />
                    </FormGroup>
                    <Button className=' col-2 btn btn-primary mx-3'>Search</Button>
                </div>
                <div className='row container'>
                    <div className="col-xl-12">
                        <div className="card mb-4 order-list">
                            <div className="gold-members p-4">
                                <b href="#">
                                </b>
                                <div className="media">
                                    {/* <b href="#">
                                    <img className="mr-4" src="img/3.jpg" alt="Generic placeholder image" />
                                </b> */}
                                    <div className="media-body">
                                        <b href="#">
                                            <span className="float-right text-success">Date<i className="feather-check-circle text-success" /></span>
                                        </b>
                                        <h6 className="mb-3"><b href="#">
                                        </b><b href="detail.html" className="text-dark">Name Customer
                                            </b>
                                        </h6>
                                        <p className="text-black-50 mb-1"><i className="feather-map-pin" /> Schedule
                                        </p>
                                        <p className="text-black-50 mb-3"><i className="feather-list" /> Amount, <i className="feather-clock ml-2" />Requirement </p>
                                        <hr />
                                        <div className='action d-flex'>
                                            <p className="mb-0 text-dark text-dark pt-2"><span className="text-dark font-weight-bold"> Status :</span>  Appprove
                                            </p>
                                            <div className="float-right">
                                                {/* <b href="messages.html" className="btn btn-sm btn-warning"><i className="feather-message-circle" /> Message</b> */}
                                                <a href="#0" className="btn btn-sm btn-success"><i className="feather-check-circle" /> Approve</a>
                                                {/* <b href="#0" className="btn btn-sm btn-info" data-toggle="modal" data-target="#edit_booking"><i className="feather-edit" /> Edit</b> */}
                                                <a href="#0" className="btn btn-sm btn-danger"><i className="feather-trash" /> Cancel</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div >

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


        </>
    );
};

export default ViewBooking;