import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import ModalUpdateProfile from './Modal/ModalUpdateProfile';
const ProfileCompany = () => {
    const [isShowModal, setIsShowModal] = useState(false);
    const handleClose = () => {
        setIsShowModal(false);
    }
    return (

        <div>
            <section >
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-6 mb-4 mb-lg-0">
                            <div className="card mb-3" style={{ borderRadius: '.5rem' }}>
                                <div className="row g-0">
                                    <div className="col-md-4 gradient-custom text-center text-white" style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                        <img src="" alt="Avatar" className="img-fluid my-5" style={{ width: 80 }} />
                                        <h5>Marie Horwitz</h5>
                                        <p>Web Designer</p>
                                        <i className="far fa-edit mb-5" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body p-4">
                                            <h6>Information</h6>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Email</h6>
                                                    <p className="text-muted">info@example.com</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Phone</h6>
                                                    <p className="text-muted">123 456 789</p>
                                                </div>
                                            </div>
                                            <h6>Projects</h6>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Recent</h6>
                                                    <p className="text-muted">Lorem ipsum</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Most Viewed</h6>
                                                    <p className="text-muted">Dolor sit amet</p>
                                                </div>
                                            </div>
                                            <ButtonGroup>
                                                <Button onClick={() => setIsShowModal(true)} className='btn btn-primary'>Edit</Button>
                                            </ButtonGroup>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ModalUpdateProfile
                show={isShowModal}
                handleClose={handleClose}
            />

        </div>
    );
};

export default ProfileCompany;