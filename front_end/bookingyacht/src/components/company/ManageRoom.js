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

    const [dataUpdateRoom, setDataUpdateRoom] = useState('')
    const handleUpdateRoom = (room) => {
        setIsShowModalUpdateRoom(true);
        setDataUpdateRoom(room)
    }


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
                        <div className='d-flex' style={{ gap: 20 }}>
                            <div className='room-name'>{room.name}</div>
                            <div>{room.area} <TbMeterSquare size={25} className='pb-1' /></div>

                            <div>{room.roomType.price} đ/KHÁCH</div>
                        </div>

                        <div className='d-flex' style={{ gap: 10 }}>
                            <Button onClick={() => handlManageImageRoom(room.idRoom)} style={{ width: 180 }} className='btn btn-light'>Manage Room Image </Button>
                            <Button onClick={() => setIsShowModalRoomService(true)} style={{ width: 173 }} className='btn btn-warning'>Manage Services</Button>
                            <Button onClick={() => handleUpdateRoom(room)} className='btn btn-primary'>Update</Button>
                        </div>

                    </div>
                )
            }

            <ModalManageRoomImage
                show={isShowModalRoomImage}
                setIsShowModalRoomImage={setIsShowModalRoomImage}
                idRoom={idRoom}
            />

            <ModalManageRoomService
                show={isShowModalRoomService}
                setIsShowModalRoomService={setIsShowModalRoomService}
                idRoom={idRoom}
            />

            <ModalUpdateRoom
                show={isShowModalUpdateRoom}
                setIsShowModalUpdateRoom={setIsShowModalUpdateRoom}
                idRoom={idRoom}
                dataUpdateRoom={dataUpdateRoom}
            />
            <ModalCreateRoom
                show={isShowModalCreateRoom}
                setIsShowModalCreateRoom={setIsShowModalCreateRoom}
                idYacht={idYacht}
            />
        </div>
    );
};

export default ManageRoom;