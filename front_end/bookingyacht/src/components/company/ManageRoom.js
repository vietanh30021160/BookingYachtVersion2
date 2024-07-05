import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, FormControl } from 'react-bootstrap';
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
import ReactPaginate from 'react-paginate';
import ModalRoomType from './Modal/ModalRoomType';


const ManageRoom = () => {
    const [isShowModalRoomImage, setIsShowModalRoomImage] = useState(false);
    const [isShowModalRoomService, setIsShowModalRoomService] = useState(false);
    const [isShowModalUpdateRoom, setIsShowModalUpdateRoom] = useState(false);
    const [isShowModalCreateRoom, setIsShowModalCreateRoom] = useState(false);
    const [isShowModalRoomType, setIsShowModalRoomType] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;

    const [idRoom, setIdRoom] = useState('');

    const { idYacht } = useParams();

    const [listRoom, setListRoom] = useState([]);

    const [searchNameRoom, setSearchNameRoom] = useState('');


    const handlManageImageRoom = (idRoom) => {
        setIsShowModalRoomImage(true);
        setIdRoom(idRoom);
    }


    useEffect(() => {
        getAllRoom();
    }, [])


    const getAllRoom = async () => {
        let res = await getAllRoomByYacht(idYacht);
        if (res && res.data && res.data.data) {
            setListRoom(res.data.data)
        } else {
            toast.info('Not Found Room By Yacht');
        }
    }

    const [dataUpdateRoom, setDataUpdateRoom] = useState('')
    const handleUpdateRoom = (room) => {
        setIsShowModalUpdateRoom(true);
        setDataUpdateRoom(room)
    }

    const handlePageChange = (selectedItem) => {
        setCurrentPage(selectedItem.selected);
    };
    const displayedRoom = listRoom.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);



    return (
        <div className='container'>

            <div >
                <NavLink to='/manage-company/view-yacht' className='p-3 d-flex nav-link' style={{ gap: 20 }}>
                    <AiFillHome className='' /> <p className='mb-0'>Back To Manage Company</p>
                </NavLink>
            </div>
            <hr />
            <div className='row'>
                <Button className='col-2 btn btn-success' onClick={() => setIsShowModalCreateRoom(true)}><FaCirclePlus style={{ marginRight: 8, marginBottom: 5 }} />Add New Room</Button>

                <Button className='col btn btn-warning mx-2' onClick={() => setIsShowModalRoomType(true)}><FaCirclePlus style={{ marginRight: 8, marginBottom: 5 }} />Manage Room Type</Button>
                <div className='col-md-4'></div>
                <FormControl
                    className='col-2 mx-2'
                    style={{ width: 'fit-content' }}
                    type='text'
                    placeholder='Enter Room Name'
                    onChange={e => setSearchNameRoom(e.target.value)}
                />
            </div>
            {
                displayedRoom && displayedRoom.length > 0 && displayedRoom
                    .filter(room => room.name.toLowerCase().includes(searchNameRoom.toLowerCase()))
                    .map((room) =>
                        <div key={room.idRoom} className='d-flex my-5 room p-3 row ' style={{ gap: 50 }}>
                            <img className='col-md-2' width={170} src={`http://localhost:8080/api/customer/file/${room.avatar}`} />
                            <div className=' col-md-3' >
                                <div className='room-name'>{room.name}</div>
                                <div>{room.area} <TbMeterSquare size={25} className='pb-1' /></div>

                                <div>{room.roomType.price} đ/KHÁCH</div>
                            </div>

                            <div className='col-md-5'>
                                <Button onClick={() => handlManageImageRoom(room.idRoom)} className='btn btn-warning mx-3'>Manage Room Image </Button>
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
            />

            <ModalUpdateRoom
                show={isShowModalUpdateRoom}
                setIsShowModalUpdateRoom={setIsShowModalUpdateRoom}
                idRoom={idRoom}
                dataUpdateRoom={dataUpdateRoom}
                getAllRoom={getAllRoom}
            />
            <ModalCreateRoom
                show={isShowModalCreateRoom}
                setIsShowModalCreateRoom={setIsShowModalCreateRoom}
                idYacht={idYacht}
                getAllRoom={getAllRoom}
            />
            <ModalRoomType
                show={isShowModalRoomType}
                setIsShowModalRoomType={setIsShowModalRoomType}
                idYacht={idYacht}
            />
            <div className='page'>
                <ReactPaginate
                    nextLabel="Next >"
                    onPageChange={handlePageChange}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={Math.ceil(listRoom.length / itemsPerPage)}
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
        </div>
    );
};

export default ManageRoom;