import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { Button, Col, FormControl, Row } from 'react-bootstrap';
import { getScheduleYacht } from '../../services/ApiServices';

const ManageSchedule = () => {
    const idYacht = useParams();
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        getAllSchedule();
    }, [])

    console.log('id', idYacht)
    const getAllSchedule = async () => {
        let res = await getScheduleYacht(idYacht);
        console.log("checo Schedule", res)
    }




    return (
        <>
            <div className='container my-3'>
                <Accordion >
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Create Schedule</Accordion.Header>
                        <Accordion.Body>
                            <Row>
                                <Col>
                                    <label>Start Date</label>
                                    <FormControl
                                        type="datetime-local"
                                        name="partydate"
                                    />
                                </Col>
                                <Col>
                                    <label >End Date</label>
                                    <FormControl
                                        type="datetime-local"
                                        name="partydate"
                                    />
                                </Col>
                            </Row>
                            <div className='text-center'>
                                <Button className='btn btn-success my-3 px-5'>Create</Button>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <div
                    className="table-responsive my-5"
                >
                    <table
                        className="table table-striped table-hover table-borderless table-primary align-middle"
                    >
                        <thead className="table-light">

                            <tr>
                                <th>Column 1</th>
                                <th>Column 2</th>
                                <th>Column 3</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            <tr
                                className="table-primary"
                            >
                                <td scope="row">Item</td>
                                <td>Item</td>
                                <td>Item</td>
                            </tr>
                            <tr
                                className="table-primary"
                            >
                                <td scope="row">Item</td>
                                <td>Item</td>
                                <td>Item</td>
                            </tr>
                        </tbody>
                        <tfoot>

                        </tfoot>
                    </table>
                </div>

            </div>

        </>
    );
};

export default ManageSchedule;