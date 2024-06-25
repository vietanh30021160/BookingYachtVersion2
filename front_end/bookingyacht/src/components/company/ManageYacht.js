import React, { useEffect, useState } from 'react';
import './ManageYacht.scss'
import { AiFillHome } from "react-icons/ai";
import { NavLink, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import ViewFeedback from './ViewFeedback';
import ManageInforYacht from './ManageInforYacht';
import { FaCirclePlus } from "react-icons/fa6";
import { deleteYachtImage, getYachtImage } from '../../services/ApiServices';
import ModalCreateImageYacht from './Modal/ModalCreateImageYacht';
import { toast } from 'react-toastify';
import ModalUpdateImageYacht from './Modal/ModalUpdateImageYacht';

const ManageYacht = () => {
    const { idYacht } = useParams();

    const [isShowModalCreateImage, setIsShowModalCreateImage] = useState(false);
    const [isShowModalUpdateImage, setIsShowModalUpdateImage] = useState(false);
    const [listYachtImage, setListYachtImage] = useState([])

    const [dataUpdate, setDataUpdate] = useState('');
    useEffect(() => {
        getAllImagesYacht()
    }, [])

    const getAllImagesYacht = async () => {
        let res = await getYachtImage(idYacht);
        if (res && res.data.data.length > 0) {
            setListYachtImage(res.data.data);
        } else {
            toast.info('Not Found Image Yacht');
        }
    }

    const handleDeleteImage = async (idImage) => {
        if (window.confirm(`Do you want to delete Image`)) {
            let res = await deleteYachtImage(idImage);
            if (res && res.data.data === true) {
                toast.success('Delete Successfully');
                getAllImagesYacht();
            } else {
                toast.error('Delete Fail');
            }

        }
    }


    const handleUpdateYachtImage = async (image) => {
        setIsShowModalUpdateImage(true);
        setDataUpdate(image);
    }


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

                    <Button onClick={() => setIsShowModalCreateImage(true)} className='btn btn-success my-3' htmlFor='labelUpload'> <FaCirclePlus /> Upload File IMAGE</Button>

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
                            {
                                listYachtImage && listYachtImage.length > 0 && listYachtImage.map((image) =>

                                    <tr
                                        key={image.idYachtImage}
                                        className="table-primary"
                                    >
                                        <td>
                                            <img src={`http://localhost:8080/api/customer/file/${image.imageYacht}`} width={200} alt='' />
                                        </td>
                                        <td width={300}>
                                            <Row>
                                                <Col md={4}>
                                                    <label onClick={() => handleUpdateYachtImage(image)} className='btn btn-primary' >Update</label>
                                                </Col>
                                                <Col md={4}>
                                                    <Button onClick={() => handleDeleteImage(image.idYachtImage)} className='btn btn-danger'>Delete</Button>
                                                </Col>
                                            </Row>

                                        </td>

                                    </tr>
                                )
                            }

                        </tbody>
                        <tfoot>

                        </tfoot>
                    </table>
                </div>

            </div>

            <div className='view-feedback container my-5'>
                <ViewFeedback
                />

            </div>

            <ModalCreateImageYacht
                show={isShowModalCreateImage}
                setShow={setIsShowModalCreateImage}
                idYacht={idYacht}
                getAllImagesYacht={getAllImagesYacht}
            />
            <ModalUpdateImageYacht
                show={isShowModalUpdateImage}
                setShow={setIsShowModalUpdateImage}
                dataUpdate={dataUpdate}
                getAllImagesYacht={getAllImagesYacht}

            />

        </div>
    );
};

export default ManageYacht;