import React, { useState } from 'react';
import './ManageYacht.scss'
import { AiFillHome } from "react-icons/ai";
import { NavLink, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import image from '../../assets/no53ab0y526yl825.webp';
import ViewFeedback from './ViewFeedback';
import ManageInforYacht from './ManageInforYacht';
import { FaCirclePlus } from "react-icons/fa6";

const ManageYacht = () => {
    const { idYacht } = useParams();


    return (
        <div>
            <div >
                <NavLink to='/manage-company/view-yacht' className='p-3 d-flex nav-link' style={{ gap: 20 }}>
                    <AiFillHome className='' /> <p className='mb-0'>Back To Manage Company</p>
                </NavLink>
            </div>
            <hr />
            <div className='manage-infor-yacht container my-5'>
                <ManageInforYacht
                    idYacht={idYacht}
                />
            </div>
            <hr />
            <div className='manage-image container'>
                <div
                    className=""
                >
                    <label className='btn btn-success my-3' htmlFor='labelUpload'> <FaCirclePlus /> Upload File IMAGE</label>
                    <input
                        type='file'
                        hidden id='labelUpload'

                    />
                    <table
                        className="table table-striped table-hover table-borderless table-primary align-middle"
                    >
                        <thead className="table-light">

                            <tr>
                                <th>Image</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            <tr
                                className="table-primary"
                            >
                                <td>
                                    <img src={image} width={200} alt='' />
                                </td>
                                <td width={300}>
                                    <Row>
                                        <Col md={4}>
                                            <label className='btn btn-primary' htmlFor='labelUpload'>Update</label>
                                            <input
                                                type='file'
                                                hidden id='labelUpload'

                                            />

                                        </Col>
                                        <Col md={4}>
                                            <Button className='btn btn-danger'>Delete</Button>
                                        </Col>
                                    </Row>

                                </td>

                            </tr>

                        </tbody>
                        <tfoot>

                        </tfoot>
                    </table>
                </div>

            </div>

            <div className='view-feedback container my-5'>
                <ViewFeedback />

            </div>



        </div>
    );
};

export default ManageYacht;