import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { AiFillHome } from "react-icons/ai";
import { NavLink } from 'react-router-dom';
import ModalManageRoomImage from './Modal/ModalManageRoomImage';
import ModalManageRoomService from './Modal/ModalManageRoomService';
import ModalUpdateRoom from './Modal/ModalUpdateRoom';

const ManageRoom = () => {
    const [isShowModalRoomImage, setIsShowModalRoomImage] = useState(false);
    const [isShowModalRoomService, setIsShowModalRoomService] = useState(false);
    const [isShowModalUpdateRoom, setIsShowModalUpdateRoom] = useState(false);


    const handleCloseImage = () => {
        setIsShowModalRoomImage(false);
    }
    const handleCloseService = () => {
        setIsShowModalRoomService(false);
    }
    const handleCloseUpdate = () => {
        setIsShowModalUpdateRoom(false);
    }
    return (
        <div className='container'>
            <div >
                <NavLink to='/manage-company/view-yacht' className='p-3 d-flex nav-link' style={{ gap: 20 }}>
                    <AiFillHome className='mt-1' /> <p>Back To Manage Company</p>
                </NavLink>
            </div>
            <hr />
            <div className='d-flex my-5 room p-3' style={{ gap: 50 }}>
                <div>Image</div>
                <div>
                    <p>Phòng Junior có ban công riêng</p>
                    <p>28m</p>
                </div>
                <div>5,300,000 đ/KHÁCH</div>

                <div className='d-flex' style={{ gap: 30 }}>
                    <Button onClick={() => setIsShowModalRoomImage(true)} style={{ width: 180 }} className='btn btn-light'>Manage Room Image </Button>
                    <Button onClick={() => setIsShowModalRoomService(true)} style={{ width: 173 }} className='btn btn-warning'>Manage Services</Button>
                    <Button onClick={() => setIsShowModalUpdateRoom(true)} className='btn btn-primary'>Update</Button>
                    <Button className='btn btn-danger'>Delete</Button>
                </div>

            </div>

            <ModalManageRoomImage
                show={isShowModalRoomImage}
                handleClose={handleCloseImage}
            />

            <ModalManageRoomService
                show={isShowModalRoomService}
                handleClose={handleCloseService}
            />

            <ModalUpdateRoom
                show={isShowModalUpdateRoom}
                handleClose={handleCloseUpdate}
            />
        </div>
    );
};

export default ManageRoom;