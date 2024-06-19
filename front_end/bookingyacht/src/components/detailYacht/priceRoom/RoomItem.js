import React from 'react';
import { Button } from 'react-bootstrap';
import { MdOutlineBedroomParent, MdOutlinePerson } from "react-icons/md";
import ServiceSelection from './ServiceSelection';
import './form-sel.scss';
const RoomItem = ({ room, handleQuantityChange, quantity, handleDetail, services, selectedServices, handleServiceChange }) => {
    const getAvatarApi = `http://localhost:8080/api/companies/file/`
    return (
        <div key={room.idRoom} className="my-3 p-3 border form-sel">
            <div className="row">
                <div className="col-md-2 col-12">
                    <img src={`${getAvatarApi}${room.avatar}`} alt={room.name} className="img-fluid rounded" />
                </div>
                <div className="col-md-6 col-12">
                    <h5 className='name-rom'><a href='#' onClick={(e) => { e.preventDefault(); handleDetail(room); }}>{room.name}</a></h5>
                    <p><MdOutlineBedroomParent /> {room.area} m2 <MdOutlinePerson /></p>
                </div>
                <div className="col-md-2 col-6 text-end">
                    <h5>{room.roomType ? room.roomType.price.toLocaleString() : 'N/A'} đ<br />
                        /khách</h5>
                </div>
                <div className="col-md-2 col-6 d-flex align-items-center justify-content-end">
                    <Button variant="outline-secondary" onClick={() => handleQuantityChange(room.idRoom, -1)}>-</Button>
                    <span className="mx-2">{quantity}</span>
                    <Button variant="outline-secondary" onClick={() => handleQuantityChange(room.idRoom, 1)}>+</Button>
                </div>
                <ServiceSelection
                    services={services}
                    selectedServices={selectedServices}
                    handleServiceChange={(servicesId) => handleServiceChange(room.idRoom, servicesId)}
                />
            </div>
        </div>
    );
};

export default RoomItem;