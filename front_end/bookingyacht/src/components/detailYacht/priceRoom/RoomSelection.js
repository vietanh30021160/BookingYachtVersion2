import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { FaArrowRightLong } from "react-icons/fa6";
import BookNowModal from './BookNowModal';
import './FormRoom.scss';
import RoomDetailModal from './RoomDetailModal';
import RoomItem from './RoomItem';
import { getUnbookedRoomsByYachtAndSchedule } from '../../../services/ApiServices';

const services = [
    { id: 1, name: 'Bữa sáng', price: 200000 },
    { id: 2, name: 'Đưa đón sân bay', price: 500000 },
    { id: 3, name: 'Gói spa', price: 700000 },
];

const RoomSelection = ({ yacht, selectedSchedule }) => {
    const [originalRooms, setOriginalRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedServices, setSelectedServices] = useState({});
    const [showBookNow, setShowBookNow] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [showDetailRoom, setShowDetailRoom] = useState(false);
    const [selectedRoomType, setSelectedRoomType] = useState(null);
    const [rooms, setRooms] = useState([]);


    useEffect(() => {
        const getUnBookedRoomList = async () => {
            try {
                const response = await getUnbookedRoomsByYachtAndSchedule(yacht.idYacht, selectedSchedule);
                const roomsData = response.data.data;
                setOriginalRooms(roomsData);
                const initialRoomType = roomsData.length > 0 ? roomsData[0].roomType.type : null;
                setSelectedRoomType(initialRoomType);
                setFilteredRooms(roomsData.filter(room => room.roomType.type === initialRoomType));
                // Initialize selected services state for each room
                setSelectedServices(response.data.data.reduce((acc, room) => ({ ...acc, [room.id]: [] }), {}));
            } catch (error) {
                console.error('Error fetching unbooked rooms:', error);
            }
        };

        if (yacht && selectedSchedule) {
            getUnBookedRoomList();
        }
    }, [yacht, selectedSchedule]);

    useEffect(() => {
        const totalServicePrice = selectedRooms.reduce((acc, room) => {
            const roomServices = selectedServices[room.id] || [];
            const roomServicePrice = roomServices.reduce((serviceAcc, serviceId) => {
                const service = services.find(s => s.id === serviceId);
                return serviceAcc + (service ? service.price : 0);
            }, 0);
            return acc + roomServicePrice;
        }, 0);
        setTotalPrice(totalServicePrice);
    }, [selectedRooms, selectedServices]);

    const handleServiceChange = (roomId, serviceId) => {
        setSelectedServices(prevServices => {
            const roomServices = prevServices[roomId] || [];
            const newRoomServices = roomServices.includes(serviceId)
                ? roomServices.filter(id => id !== serviceId)
                : [...roomServices, serviceId];
            return { ...prevServices, [roomId]: newRoomServices };
        });
    };

    const hanldeRoomSelect = (room, isChecked) => {
        if (isChecked) {
            setSelectedRooms([...selectedRooms, room]);
        } else {
            setSelectedRooms(selectedRooms.filter(selectedRoom => selectedRoom !== room));
        }
    };

    const handleReset = () => {
        setSelectedRooms([]);
        setSelectedServices(rooms.reduce((acc, room) => ({ ...acc, [room.id]: [] }), {}));
    };
    const handleDetail = (room) => {
        setSelectedRoom(room);
        setShowDetailRoom(true);
    };

    const handleBookNow = () => {
        setShowBookNow(true);
    };
    const cssButtonClicked = {
        backgroundColor: 'orange',
        color: 'balck'
    }
    const renderRoomType = () => {
        const uniqueRoomTypes = [...new Set(originalRooms.map(room => room.roomType.type))];
        return uniqueRoomTypes.map(roomType => (
            <button
                key={roomType}
                className="btn btn-outline-info mx-2 "
                style={{
                    width: '100px',
                    ...(selectedRoomType === roomType ? cssButtonClicked : {})
                }}
                onClick={() => filterByRoomType(roomType)}
                disabled={selectedRoomType === roomType}
            >
                {roomType}
            </button>
        ));
    }

    const filterByRoomType = (roomType) => {
        setSelectedRoomType(roomType);
        const filtered = originalRooms.filter(room => room.roomType.type === roomType);
        setFilteredRooms(filtered);
    }


    return (
        <Container>
            <h5 className='mb-3'>Phòng trống:</h5>
            {renderRoomType()}
            <div className='form-select mt-3'>
                {filteredRooms.map(room => (
                    <RoomItem
                        key={room.idRoom}
                        room={room}
                        isSelected={selectedRooms.includes(room)}
                        handleDetail={handleDetail}
                        services={services}
                        selectedServices={selectedServices[room.id] || []}
                        handleServiceChange={handleServiceChange}
                        handleRoomSelect={hanldeRoomSelect}
                    />
                ))}

                <div className='my-3'>
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <Button className='mb-3' variant="outline-danger" onClick={handleReset}>Xóa lựa chọn</Button>
                            <h5>Tổng tiền: {totalPrice.toLocaleString()} đ</h5>
                        </div>
                        <div className="col-md-6 col-12 text-end">
                            <Button variant="secondary" className='rent' onClick={handleBookNow}>Thuê trọn tàu</Button>
                            <Button variant="custom ms-2" onClick={handleBookNow}>Đặt ngay <FaArrowRightLong /></Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <BookNowModal
                selectedRooms={selectedRooms}
                services={services}
                totalPrice={totalPrice}
                show={showBookNow}
                handleClose={() => setShowBookNow(false)}
            /> */}
            {/* <RoomDetailModal
                room={selectedRoom}
                show={showDetailRoom}
                handleClose={() => setShowDetailRoom(false)}
            /> */}
        </Container>
    );
};

export default RoomSelection;