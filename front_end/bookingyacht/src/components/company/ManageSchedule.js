import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { AiFillHome } from "react-icons/ai";
import { NavLink, useParams } from 'react-router-dom';
import { Form, FormControl } from 'react-bootstrap';
import { createScheduleYacht, getScheduleYacht } from "../../services/ApiServices";
import { toast } from "react-toastify";
import { get } from "lodash";



const ManageSchedule = () => {

    const yachtId = useParams(); //get yachtId from URL parameters

    const [getSchedule, setSchedule] = useState([]);
    const [getStartDate, setStartDate] = useState('');
    const [getEndDate, setEndDate] = useState('');



    useEffect(() => {
        fetchScheduleYacht()
    }, [])
    console.log("day la yacht id", yachtId)

    const fetchScheduleYacht = async () => {
        let res = await getScheduleYacht(yachtId.yachtId)
        //check data empty or not
        if (res && res.data.data) {
            setSchedule(res.data.data)
        } else {
            toast.error("Can not found Schedule")
            console.log("can not found schedule")
        }
    }

    const handleCreateYachtSchedule = async () => {
        if (!getStartDate || !getEndDate) {
            toast.error('Input can not empty');
            return;
        }

        //check start date is before end date 
        if (getStartDate >= getEndDate) {
            toast.error('Start date must be before end date');
            return;
        }

        //call API and wait results
        let res = await createScheduleYacht(yachtId.yachtId, getStartDate.trim(), getEndDate.trim());

        if (res && res.data.data.length > 0) {
            toast.success("Create schedule successfully");
            getScheduleYacht();
        } else {
            toast.error("Create fail");
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
                                    <Form.Group as={Col} controlId="formGridStartDate">
                                        <Form.Label>Start Date</Form.Label>
                                        <FormControl
                                            type="datetime-local"
                                            value={getStartDate}
                                            onChange={e => setStartDate(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridEndDate">
                                        <Form.Label>End Date</Form.Label>
                                        <FormControl
                                            type="datetime-local"
                                            value={getEndDate}
                                            onChange={e => setEndDate(e.target.value)}
                                        />
                                    </Form.Group>
                                </Row>
                                <Button onClick={handleCreateYachtSchedule} variant="success" type="submit">
                                    Create
                                </Button>
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
                                getSchedule && getSchedule.length > 0 && getSchedule.map((Schedule) =>
                                    <tr key={Schedule.idSchedule}>
                                        <td>{Schedule.startDate}</td>
                                        <td>{Schedule.endDate}</td>
                                        <td>
                                            <div className="d-flex" style={{ justifyContent: 'center' }}>
                                                <div>

                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageSchedule;
