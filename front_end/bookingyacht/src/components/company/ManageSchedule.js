import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { AiFillHome } from "react-icons/ai";
import { NavLink, useParams } from 'react-router-dom';
import { Form, FormControl } from 'react-bootstrap';
import { createScheduleYacht, deleteScheduleYacht, getScheduleYacht } from "../../services/ApiServices";
import { toast } from "react-toastify";
import ModalUpdateScheduleYacht from "./Modal/ModalUpdateScheduleYacht";



const ManageSchedule = () => {

    const yachtId = useParams(); //get yachtId from URL parameters
    const [getShowModalUpdateScheduleYacht, setShowModalUpdateScheduleYacht] = useState(false);

    const [getSchedule, setSchedule] = useState([]);
    const [getStartDate, setStartDate] = useState('');
    const [getEndDate, setEndDate] = useState('');
    const [getScheduleUpdate, setScheduleUpdate] = useState({});



    useEffect(() => {
        fetchScheduleYacht()
    }, [])
    console.log("day la yacht id", yachtId)

    const handleClose = () => {
        setShowModalUpdateScheduleYacht(false)
    }

    const fetchScheduleYacht = async () => {
        let res = await getScheduleYacht(yachtId.idYacht)
        //check data empty or not
        if (res && res.data.data) {
            setSchedule(res.data.data)
        } else {
            toast.error("Không tìm thấy lịch trình")
            console.log("can not found schedule")
        }
    }

    const handleCreateYachtSchedule = async () => {
        if (!getStartDate || !getEndDate) {
            toast.error('Không được để trống ngày đi hoặc ngày về');
            return;
        }

        const now = Date.now();
        if (new Date(getStartDate).getTime() <= now) {
            toast.error('Ngày đi phải trước' + formatDateTime(now));
            return;
        }

        //check start date is before end date 
        if (new Date(getStartDate).getTime() >= new Date(getEndDate).getTime()) {
            toast.error('Ngày đi phải trước ngày về');
            return;
        }

        //call API and wait results
        let res = await createScheduleYacht(yachtId.idYacht, getStartDate, getEndDate);
        console.log('create', res)

        if (res && res.data.data === true) {
            toast.success("Tạo lịch trình mới thành công");
            fetchScheduleYacht();
        } else {
            toast.error("Tạo lịch trình thất bại");
        }
    }

    const handleUpdateScheduleYacht = async (schedule) => {
        setShowModalUpdateScheduleYacht(true);
        setScheduleUpdate(schedule)
    }

    const handleDeleteScheduleYacht = async (schedule) => {
        if (window.confirm(`Bạn có chắc muốn xóa lịch trình này`)) {
            let res = await deleteScheduleYacht(yachtId.idYacht, schedule.idSchedule)
            console.log('Delete', res)

            if (res && res.data.data === true) {
                toast.success("Xóa lịch trình thành công");
                fetchScheduleYacht();
            } else if (res && res.data && res.data.data === "22") {
                toast.error("Lịch trình đã tồn tại trong 1 đơn đặt chỗ");
            } else if (res && res.data && res.data.data === "11") {
                toast.error("Xóa lịch trình thất bại");
            }
        }
    }

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero indexed
        const year = date.getFullYear();
        return `${hours}:${minutes} ${day}/${month}/${year}`;
    }

    return (
        <div>
            <div>
                <NavLink to='/manage-company/view-yacht' className='p-3 d-flex nav-link' style={{ gap: 20 }}>
                    <AiFillHome className='' /> <p className='mb-0'>Trở về quản lí công ty</p>
                </NavLink>
            </div>

            <div className="container">
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Tạo mới lịch trình</Accordion.Header>
                        <Accordion.Body>
                            <Form>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Ngày đi</Form.Label>
                                        <FormControl
                                            type="datetime-local"
                                            value={getStartDate}
                                            onChange={e => setStartDate(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Ngày về</Form.Label>
                                        <FormControl
                                            type="datetime-local"
                                            value={getEndDate}
                                            onChange={e => setEndDate(e.target.value)}
                                        />
                                    </Form.Group>
                                </Row>
                                <div className="d-flex" style={{justifyContent: 'center'}}>
                                    <Button
                                        onClick={handleCreateYachtSchedule}
                                        variant="success"
                                    >
                                        Tạo
                                    </Button>
                                </div>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <div className="table-responsive my-5">
                    <table className="table table-striped table-hover table-borderless table-primary align-middle">
                        <thead className="table-dark">
                            <h4>Danh sách lịch trình</h4>
                            <tr>
                                <th>Ngày đi</th>
                                <th>Ngày về</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="table-light">

                            {
                                getSchedule && getSchedule.length > 0 && getSchedule.map((schedule) =>
                                    <tr key={schedule.idSchedule}>
                                        <td>{formatDateTime(schedule.startDate)}</td>
                                        <td>{formatDateTime(schedule.endDate)}</td>
                                        <td className="d-flex" style={{ gap: 50, justifyContent: 'center' }}>
                                            <Button
                                                variant="primary"
                                                className="mx-2"
                                                onClick={() => handleUpdateScheduleYacht(schedule)}
                                            >
                                                Sửa
                                            </Button>
                                            <Button
                                                variant="danger"
                                                className="mx-2"
                                                onClick={() => handleDeleteScheduleYacht(schedule)}
                                            >
                                                Xóa
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            <ModalUpdateScheduleYacht
                show={getShowModalUpdateScheduleYacht}
                scheduleUpdate={getScheduleUpdate}
                handleClose={handleClose}
                yachtId={yachtId}
                getScheduleYacht={fetchScheduleYacht}
            />
        </div>
    );
};

export default ManageSchedule;
