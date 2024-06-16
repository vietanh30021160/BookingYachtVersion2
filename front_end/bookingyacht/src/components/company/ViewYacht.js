import React, { useState } from 'react';
import yacht from '../../assets/no53ab0y526yl825.webp'
import { Button, FormControl, FormGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RiShipLine } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import './ViewYacht.scss'
import ReactPaginate from 'react-paginate';
import './Company.scss'
import { FaCirclePlus } from "react-icons/fa6";
import ModalCreateYacht from './Modal/ModalCreateYacht';

const ViewYacht = () => {
    const navigate = useNavigate();
    const [isShowModal, setIsShowModal] = useState(false);
    const handleClose = () => {
        setIsShowModal(false);
    }
    return (
        <div className='view-yacht-container'>
            <div className='row my-4'>
                <h2 className='col-2'>List Yacht</h2>

                <Button className='col-2 btn btn-success' onClick={() => setIsShowModal(true)}><FaCirclePlus style={{ marginRight: 8, marginBottom: 5 }} />Add New Yacht</Button>
                <FormGroup className='col-8 d-flex'>
                    <FormControl placeholder='Search' type='text' />
                    <Button className='btn btn-primary mx-3'>Search</Button>
                </FormGroup>

            </div>

            <div className='row container'>
                <div className="col-xl-12">
                    <div className="card mb-4 order-list">
                        <div className="gold-members p-4">

                            <div className="media">

                                <img className="mr-4" src={yacht} alt="Generic placeholder image" />

                                <div className="media-body">
                                    <div className='card-content'>
                                        <div className='location'><FaLocationDot />Vịnh Hạ Long</div>
                                        <div className='name'>Du thuyền Heritage Bình Chuẩn Cát Bà</div>
                                        <div> <RiShipLine /> Ha thuy 2019 - Tau vo kim loai - 20 phong </div>

                                    </div>
                                    <div className='action d-flex'>
                                        <p className="mb-0 text-dark text-dark pt-2"><span className="text-dark font-weight-bold"></span>
                                        </p>
                                        <div className="float-right">
                                            <Button className="btn btn-sm btn-success" onClick={() => navigate('/manage-yacht')}><i className="feather-check-circle" />Manage Yacht</Button>
                                            <Button className="btn btn-sm btn-warning" onClick={() => navigate('/manage-room')}><i className="feather-trash" /> Manage Room </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

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
            <ModalCreateYacht
                show={isShowModal}
                handleClose={handleClose}
            />

        </div>
    );
};

export default ViewYacht;