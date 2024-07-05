import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './Auth.scss'
import { FcPlus } from "react-icons/fc";
import { FaHome } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { fillInformationCompany } from '../../services/ApiServices';


const InformationCompany = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [logo, setLogo] = useState('');
    const [email, setEmail] = useState('');
    const [previewLogo, setPreviewLogo] = useState('');

    const { idCompany } = useParams();

    const handelUploadImage = (event) => {
        if (event.target.files[0] && event.target && event.target.files) {
            setPreviewLogo(URL.createObjectURL(event.target.files[0]));
            setLogo(event.target.files[0]);
        }
    }

    const handleFillInformation = () => {
        let res = fillInformationCompany(idCompany, name, address, logo, email);
    }

    return (
        <div className='container my-5 py-5 px-5 form-infor' style={{ backgroundColor: "#C6F5F6", }}>

            <h1>Thông tin Công Ty</h1>

            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Email"
                            onChange={event => setEmail(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} >
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Name "
                            onChange={event => setName(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Address"
                            onChange={event => setAddress(event.target.value)}
                        />
                    </Form.Group>
                </Row>
                <div className='col-mad-12'>
                    <label className='form-label label-upload' htmlFor='labelUpload'> <FcPlus /> Upload File IMAGE</label>
                    <input
                        type='file'
                        hidden id='labelUpload'
                        name='image'
                        onChange={(event) => handelUploadImage(event)}
                    />
                </div>
                <div className='col-md-12 img-preview'>
                    {previewLogo ?
                        <img src={previewLogo} />
                        :
                        <span>Preview Logo</span>
                    }
                </div>
                <div className='my-3'>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={() => handleFillInformation()}>
                        Submit

                    </Button>
                    <Link to='/signin' className='mx-5 my-0 btn btn-light' style={{ textDecoration: "none" }}><FaHome style={{ marginBottom: 4 }} /> Home</Link>
                </div>
            </Form>
        </div>
    );
};

export default InformationCompany;