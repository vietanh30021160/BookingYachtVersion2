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

    const handleClose = () => {
        setShowModalUpdateScheduleYacht(false)
    }

    const fetchScheduleYacht = async () => {
        let res = await getScheduleYacht(yachtId.idYacht)
        //check data empty or not
        if (res && res.data.data) {
            setSchedule(res.data.data)
        } else {
            toast.error("Can not found Schedule")
        }
    }

    const handleCreateYachtSchedule = async () => {
        if (!getStartDate || !getEndDate) {
            toast.error('Input can not empty');
            return;
        }

        const now = Date.now();
        if (new Date(getStartDate).getTime() <= now) {
            toast.error('Start date must be in the future');
            return;
        }

        //check start date is before end date 
        if (new Date(getStartDate).getTime() >= new Date(getEndDate).getTime()) {
            toast.error('Start date must be before end date');
            return;
        }

        //call API and wait results
        let res = await createScheduleYacht(yachtId.idYacht, getStartDate, getEndDate);

        if (res && res.data.data === true) {
            toast.success("Create schedule successfully");
            fetchScheduleYacht();
        } else {
            toast.error("Create fail");
        }
    }

    const handleUpdateScheduleYacht = async (schedule) => {
        setShowModalUpdateScheduleYacht(true);
        setScheduleUpdate(schedule)
    }

    const handleDeleteScheduleYacht = async (schedule) => {
        if (window.confirm(`You Want To Delete Schedule`)) {
            let res = await deleteScheduleYacht(yachtId.idYacht, schedule.idSchedule)

            if (res && res.data.data === true) {
                toast.success("Delete Successfully");
                fetchScheduleYacht();
            } else {
                toast.error("Delete Fail");
            }
        }
    }

    return (
        <div>
            <div>
                <NavLink to='/manage-company/view-yacht' className='p-3 d-flex nav-link' style={{ gap: 20 }}>
                    <AiFillHome className='' /> <p className='mb-0'>Back To Manage Company</p>
                </NavLink>
            </div>

            <div className="container">
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Create Schedule</Accordion.Header>
                        <Accordion.Body>
                            <Form>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Start Date</Form.Label>
                                        <FormControl
                                            type="datetime-local"
                                            value={getStartDate}
                                            onChange={e => setStartDate(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>End Date</Form.Label>
                                        <FormControl
                                            type="datetime-local"
                                            value={getEndDate}
                                            onChange={e => setEndDate(e.target.value)}
                                        />
                                    </Form.Group>
                                </Row>
                                <div className="d-flex" style={{ justifyContent: 'center' }}>
                                    <Button
                                        onClick={handleCreateYachtSchedule}
                                        variant="success"
                                    >
                                        Create
                                    </Button>
                                </div>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <div className="table-responsive my-5">
                    <table className="table table-striped table-hover table-borderless table-primary align-middle">
                        <thead className="table-dark">
                            <h4>List Schedule</h4>
                            <tr>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="table-light">

                            {
                                getSchedule && getSchedule.length > 0 && getSchedule.map((schedule) =>
                                    <tr key={schedule.idSchedule}>
                                        <td>{schedule.startDate}</td>
                                        <td>{schedule.endDate}</td>
                                        <td className="d-flex" style={{ gap: 50, justifyContent: 'center' }}>
                                            <Button
                                                variant="primary"
                                                className="mx-2"
                                                onClick={() => handleUpdateScheduleYacht(schedule)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="danger"
                                                className="mx-2"
                                                onClick={() => handleDeleteScheduleYacht(schedule)}
                                            >
                                                Delete
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
