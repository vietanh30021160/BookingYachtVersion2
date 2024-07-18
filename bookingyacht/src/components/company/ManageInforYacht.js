import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { getAllLocation, getYachtById, getYachtByIdYacht, getYachtType, updateYacht } from '../../services/ApiServices';
import Form from 'react-bootstrap/Form';
import { FcPlus } from "react-icons/fc";
import _ from 'lodash'
import { toast } from 'react-toastify';
const ManageInforYacht = (props) => {
    const { idYacht } = props;
    const [inforYacht, setInforYacht] = useState({})
    const [listLocation, setListLocation] = useState([]);
    const [listYachtType, setListYachtType] = useState([]);
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [idLocation, setIdLocation] = useState('');
    const [idYachtType, setIdYachtType] = useState('');
    const initInforYacht = {
        name: '',
        image: '',
        hullBody: '',
        itinerary: '',
        rule: '',
        description: '',


    }

    useEffect(() => {
        getYacht();
        getLocation();
        getAllType();
    }, [])

    const getYacht = async () => {
        const res = await getYachtByIdYacht(idYacht);
        if (res && res.data && res.data.data) {
            setInforYacht(res.data.data);
        } else {
            toast.error('Not Found Data Yacht')
        }
    }

    useEffect(() => {
        if (!_.isEmpty(inforYacht)) {
            setDataUpdate(inforYacht)
            setIdLocation(inforYacht.location.idLocation);
            setIdYachtType(inforYacht.yachtType.idYachtType);
            if (dataUpdate.image) {
                setPreviewImage(dataUpdate.image)
            }
        }
    }, [inforYacht]);






    const [dataUpdate, setDataUpdate] = useState(initInforYacht)

    const getLocation = async () => {
        let res = await getAllLocation();
        if (res && res.data.data.length > 0) {
            setListLocation(res.data.data);
        } else {
            toast.error('Location Not Found')
        }
    }
    const getAllType = async () => {
        let res = await getYachtType();
        if (res && res.data.data.length > 0) {
            setListYachtType(res.data.data)
        } else {
            toast.error('Yacht Type Not Found')
        }
    }

    const handleChange = (e) => {
        setDataUpdate({
            ...dataUpdate,
            [e.target.name]: e.target.value
        }

        )
    }
    const handelUploadImage = (event) => {
        if (event.target.files[0] && event.target && event.target.files) {

            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    }

    const validateInput = () => {
        const { name, hullBody, itinerary, rule, description } = dataUpdate;
        if (!name || !hullBody || !itinerary || !rule || !description || !idLocation || !idYachtType) {
            toast.error('Please fill in all fields');
            return false;
        }
        return true;
    };

    const handleUpdateYacht = async () => {
        if (!validateInput()) return;
        let res = await updateYacht(idYacht, dataUpdate.name.trim(), image,
            dataUpdate.hullBody.trim(), dataUpdate.description.trim(),
            dataUpdate.rule.trim(), dataUpdate.itinerary.trim(),
            idYachtType, idLocation);

        if (res && res.data.data === true) {
            toast.success('Update Success');
            getYacht();
        } else {
            toast.error('Update Fail')
        }
    }

    return (
        <div>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Update Yacht</Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        name='name'
                                        type="text"
                                        onChange={handleChange}
                                        value={dataUpdate.name}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Label>Hull-Body</Form.Label>
                                    <Form.Control
                                        name='hullBody'
                                        type="text"
                                        onChange={handleChange}
                                        value={dataUpdate.hullBody}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} >
                                    <Form.Label>Itinerary</Form.Label>
                                    <Form.Control
                                        name='itinerary'
                                        type="text"
                                        onChange={handleChange}
                                        value={dataUpdate.itinerary}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} >
                                    <Form.Label>Rule</Form.Label>
                                    <Form.Control
                                        name='rule'
                                        type="text"
                                        onChange={handleChange}
                                        value={dataUpdate.rule}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Label>Location</Form.Label>
                                    <Form.Select value={idLocation} onChange={event => setIdLocation(event.target.value)} >
                                        {
                                            listLocation && listLocation.map((location) =>
                                                <option key={location.idLocation} value={location.idLocation}>{location.name}</option>
                                            )
                                        }

                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Label>Yacht Type</Form.Label>
                                    <Form.Select value={idYachtType} onChange={event => setIdYachtType(event.target.value)} >
                                        {
                                            listYachtType && listYachtType.map((type) =>
                                                <option key={type.idYachtType} value={type.idYachtType}>{type.starRanking} Sao</option>
                                            )
                                        }


                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    name='description'
                                    as="textarea"
                                    style={{ height: '100px' }}
                                    onChange={handleChange}
                                    value={dataUpdate.description}
                                />
                            </Row>
                            <div className='col-mad-12'>
                                <label className='form-label label-upload' htmlFor='labelUpload'> <FcPlus /> Upload File IMAGE</label>
                                <input
                                    type='file'
                                    accept='image/*'
                                    hidden id='labelUpload'
                                    name='image'
                                    onChange={(event) => handelUploadImage(event)}
                                />
                            </div>
                            <div className='col-md-12 img-preview'>
                                {previewImage ?
                                    <img src={previewImage} />
                                    :
                                    <span>Update Avartar</span>
                                }
                            </div>

                            <Button onClick={handleUpdateYacht} className='my-3 text-center'>Update Now</Button>

                        </Form>
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>



        </div>
    );
};

export default ManageInforYacht;