import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { AiFillHome } from "react-icons/ai";
import { NavLink, useParams } from 'react-router-dom';
import ModalManageRoomImage from './Modal/ModalManageRoomImage';
import ModalManageRoomService from './Modal/ModalManageRoomService';
import ModalUpdateRoom from './Modal/ModalUpdateRoom';
import { getAllRoomByYacht } from '../../services/ApiServices';
import { toast } from 'react-toastify';
import { TbMeterSquare } from "react-icons/tb";
import './ManageYacht.scss'
import { FaCirclePlus } from "react-icons/fa6";
import ModalCreateRoom from './Modal/ModalCreateRoom';


const ManageRoom = () => {
    const [isShowModalRoomImage, setIsShowModalRoomImage] = useState(false);
    const [isShowModalRoomService, setIsShowModalRoomService] = useState(false);
    const [isShowModalUpdateRoom, setIsShowModalUpdateRoom] = useState(false);
    const [isShowModalCreateRoom, setIsShowModalCreateRoom] = useState(false);

    const [idRoom, setIdRoom] = useState('');

    const { idYacht } = useParams();

    const [listRoom, setListRoom] = useState([]);

    const handleCloseImage = () => {
        setIsShowModalRoomImage(false);
    }
    const handleCloseService = () => {
        setIsShowModalRoomService(false);
    }
    const handleCloseUpdate = () => {
        setIsShowModalUpdateRoom(false);
    }
    const handleCloseCreateRoom = () => {
        setIsShowModalCreateRoom(false);
    }

    const handlManageImageRoom = (idRoom) => {
        setIsShowModalRoomImage(true);
        setIdRoom(idRoom);
    }

    useEffect(() => {
        getAllRoom();
    }, [])


    const getAllRoom = async () => {
        let res = await getAllRoomByYacht(idYacht);
        if (res && res.data.data.length > 0) {
            setListRoom(res.data.data)
        } else {
            toast.info('Not Found Room By Yacht');
        }
    }
    console.log("check room", listRoom)


    return (
        <div className='container'>

            <div >
                <NavLink to='/manage-company/view-yacht' className='p-3 d-flex nav-link' style={{ gap: 20 }}>
                    <AiFillHome className='' /> <p className='mb-0'>Back To Manage Company</p>
                </NavLink>
            </div>
            <hr />
            <Button className='col-2 btn btn-success' onClick={() => setIsShowModalCreateRoom(true)}><FaCirclePlus style={{ marginRight: 8, marginBottom: 5 }} />Add New Room</Button>

            {
                listRoom && listRoom.length > 0 && listRoom.map((room) =>
                    <div key={room.idRoom} className='d-flex my-5 room p-3' style={{ gap: 50 }}>
                        <img width={170} src={`http://localhost:8080/api/customer/file/${room.avatar}`} />
                        <div>
                            <p className='room-name'>{room.name}</p>
                            <p>{room.area} <TbMeterSquare size={25} className='pb-1' /></p>

                        </div>
                        <p>{room.roomType.price} đ/KHÁCH</p>

                        <div className='d-flex' style={{ gap: 30 }}>
                            <Button onClick={() => handlManageImageRoom(room.idRoom)} style={{ width: 180 }} className='btn btn-light'>Manage Room Image </Button>
                            <Button onClick={() => setIsShowModalRoomService(true)} style={{ width: 173 }} className='btn btn-warning'>Manage Services</Button>
                            <Button onClick={() => setIsShowModalUpdateRoom(true)} className='btn btn-primary'>Update</Button>
                            <Button className='btn btn-danger'>Delete</Button>
                        </div>

                    </div>
                )
            }

            <ModalManageRoomImage
                show={isShowModalRoomImage}
                handleClose={handleCloseImage}
                idRoom={idRoom}
            />

            <ModalManageRoomService
                show={isShowModalRoomService}
                handleClose={handleCloseService}
            />

            <ModalUpdateRoom
                show={isShowModalUpdateRoom}
                handleClose={handleCloseUpdate}
            />
            <ModalCreateRoom
                show={isShowModalCreateRoom}
                handleClose={handleCloseCreateRoom}
                idYacht={idYacht}
            />
        </div>
    );
};

export default ManageRoom;