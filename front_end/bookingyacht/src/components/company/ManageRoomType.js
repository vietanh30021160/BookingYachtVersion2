import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaCirclePlus } from "react-icons/fa6";
import { deleteRoomType, getAllRoomType } from '../../services/ApiServices';
import { toast } from 'react-toastify';
import ModalCreateRoomType from './Modal/ModalCreateRoomType';
import ModalUpdateRoomType from './Modal/ModalUpdateRoomType';

const ManageRoomType = () => {
    const [isShowModalCreateRoomType, setIsShowModalCreateRoomType] = useState(false);
    const [isShowModalUpdateRoomType, setIsShowModalUpdateRoomType] = useState(false);
    const [dataUpdate, setDataUpdate] = useState([]);

    const [roomType, setRoomType] = useState('');

    useEffect(() => {
        getRoomType();
    }, [])


    const getRoomType = async () => {
        let res = await getAllRoomType();
        if (res && res.data.data.length > 0) {
            setRoomType(res.data.data);
        } else {
            toast.info('Not Found Room Type');
        }
    }

    const handleUpdateRoomType = (type) => {
        setIsShowModalUpdateRoomType(true);
        setDataUpdate(type);
    }

    const handleDeleteRoomType = async (type) => {
        if (window.confirm(`You Want To Delete Room Type ${type.utilities}`)) {
            let res = await deleteRoomType(type.idRoomType);
            if (res && res.data.data === true) {
                toast.success('Delete Successfully');
                getRoomType();
            } else {
                toast.error('Delete Fail');
            }
        }

    }

    return (
        <div className='container'>
            <div className='my-4'>
                <Button className='col-2 btn btn-success' onClick={() => setIsShowModalCreateRoomType(true)}><FaCirclePlus style={{ marginRight: 8, marginBottom: 5 }} />Add New Room Type</Button>

            </div>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Price</th>
                        <th scope="col">Type</th>
                        <th scope="col">Utilities</th>
                        <th className='text-center' scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        roomType && roomType.length > 0 && roomType.map((type) =>
                            <tr key={type.idRoomType}>
                                <td>{type.price}</td>
                                <td>{type.type}</td>
                                <td>{type.utilities}</td>
                                <td>
                                    <div className='d-flex' style={{ gap: 20, justifyContent: 'center' }}>
                                        <Button onClick={() => handleUpdateRoomType(type)} className='btn btn-warning'>Update</Button>
                                        <Button onClick={() => handleDeleteRoomType(type)} className='btn btn-danger'>Delete</Button>
                                    </div>
                                </td>

                            </tr>
                        )
                    }


                </tbody>
            </table>
            <ModalCreateRoomType
                show={isShowModalCreateRoomType}
                setIsShowModalCreateRoomType={setIsShowModalCreateRoomType}
                getRoomType={getRoomType}
            />

            <ModalUpdateRoomType
                show={isShowModalUpdateRoomType}
                setIsShowModalUpdateRoomType={setIsShowModalUpdateRoomType}
                dataUpdate={dataUpdate}
                getRoomType={getRoomType}

            />
        </div>
    );
};

export default ManageRoomType;