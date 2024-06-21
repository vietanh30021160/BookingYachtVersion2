import React from 'react';
import { Button } from 'react-bootstrap';
import { MdOutlineBedroomParent, MdOutlinePerson } from "react-icons/md";
import ServiceSelection from './ServiceSelection';
import './form-sel.scss';

const RoomItem = ({ room, handleDetail }) => {
    const getAvatarApi = `http://localhost:8080/api/customer/file/`
    return (
        <div key={room.idRoom} className="my-3 p-3 border form-sel">
            <div className="row align-items-center">
                <div className="col-md-2 col-12">
                    <img src={`${getAvatarApi}${room.avatar}`} alt={room.name} className="img-fluid rounded object-fit-cover" />
                </div>
                <div className="col-md-6 col-12">
                    <h5 style={{ fontWeight: 'bold' }} className='name-rom'><a href='#' onClick={(e) => { e.preventDefault(); handleDetail(room); }}>{room.name}</a></h5>
                    <p><MdOutlineBedroomParent /> {room.area} m2 <MdOutlinePerson /></p>
                </div>
                <div className="col-md-2 col-6 text-end">
                    <h5>{room.roomType ? room.roomType.price.toLocaleString() : 'N/A'} đ</h5>
                </div>
                <div className="col-md-2 col-6 d-flex align-items-center justify-content-end">
                    <input style={{ width: 50, transform: 'scale(2)' }} type="checkbox" />
                </div>
                {/* <ServiceSelection
                    services={services}
                    selectedServices={selectedServices}
                    handleServiceChange={(servicesId) => handleServiceChange(room.idRoom, servicesId)}
                /> */}
            </div>
        </div>
    );
};

export default RoomItem;