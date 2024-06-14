import React from 'react';
import './ManageYacht.scss'
import { AiFillHome } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';
import image from '../../assets/no53ab0y526yl825.webp'
const ManageYacht = () => {
    return (
        <div>
            <div >
                <NavLink to='/manage-company/view-yacht' className='p-3 d-flex nav-link' style={{ gap: 20 }}>
                    <AiFillHome className='mt-1' /> <p>Back To Manage Company</p>
                </NavLink>
            </div>
            <hr />
            <div className='manage-image container'>
                <div
                    className="table-responsive "
                >
                    <Button className='btn btn-success my-3'>Add Image</Button>
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
                                <td>
                                    <ButtonGroup className='d-flex' style={{ gap: 20 }}>
                                        <Button className='btn btn-danger'>Delete</Button>
                                        <Button className='btn btn-infor'>Update</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>

                        </tbody>
                        <tfoot>

                        </tfoot>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default ManageYacht;