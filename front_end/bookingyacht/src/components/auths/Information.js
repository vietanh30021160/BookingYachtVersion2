import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './Auth.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { fillInformationCustomer } from '../../services/ApiServices';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { add } from 'lodash';
import { information } from '../../redux/action/InformationAction';
const Information = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const { idCustomer } = useParams()
    const handleFillInformation = async () => {
        if (!email || !fullName || !phoneNumber || !address) {
            toast.error('Input Not Empty!')
        } else {
            let res = await fillInformationCustomer(idCustomer, fullName, email, phoneNumber, address);
            if (res && res.data.data === true) {
                toast.success('Fill Information Successfully');
                dispatch(information(email, fullName, phoneNumber, address));
                setEmail('');
                setAddress('');
                setFullName('');
                setPhoneNumber('');
                navigate('/signin')
            } else {
                toast.error('Fill Information Fail')
            }
        }
    }


    return (
        <div className='container my-5 py-5 px-5 form-infor' style={{ backgroundColor: "#C6F5F6", }}>

            <h1>Thông tin khách hàng</h1>

            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={event => setEmail(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>FullName</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="FullName"
                            onChange={event => setFullName(event.target.value)}
                        />

                    </Form.Group>
                </Row>


                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>PhoneNumber</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Start With 0 and 9 Number'
                            onChange={event => setPhoneNumber(event.target.value)}
                        />
                    </Form.Group>


                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Address'
                            onChange={event => setAddress(event.target.value)}

                        />
                    </Form.Group>
                </Row>


                <div>
                    <Button
                        variant="primary"
                        onClick={() => handleFillInformation()}>
                        Submit
                    </Button>
                </div>

            </Form>
        </div>
    );
};

export default Information;