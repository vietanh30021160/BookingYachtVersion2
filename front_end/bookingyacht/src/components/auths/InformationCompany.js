import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './Auth.scss'
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
const InformationCompany = () => {
    return (
        <div className='container my-5 py-5 px-5 form-infor' style={{ backgroundColor: "#C6F5F6", }}>

            <h1>Thông tin Công Ty</h1>

            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                </Row>


                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Select defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Row>

                <div>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Link to='/signin' className='mx-5 my-0 btn btn-light' style={{ textDecoration: "none" }}><FaHome style={{ marginBottom: 4 }} /> Home</Link>
                </div>
            </Form>
        </div>
    );
};

export default InformationCompany;