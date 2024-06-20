import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { getYachtById } from '../../services/ApiServices';
import Form from 'react-bootstrap/Form';
import { FcPlus } from "react-icons/fc";
import _ from 'lodash'
const ManageInforYacht = (props) => {
    const { idYacht } = props;
    const [inforYacht, setInforYacht] = useState({})

    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const initInforYacht = {
        name: '',
        hullBody: '',
        launch: '',
        itinerary: '',
        rule: '',
        description: '',
    }



    // const [isShowModal, setIsShowModal] = useState(false);
    // const handleClose = () => {
    //     setIsShowModal(false);
    // }


    useEffect(() => {
        getYacht()
    }, [])

    useEffect(() => {
        if (!_.isEmpty(inforYacht)) {
            setDataUpdate(inforYacht)
            if (dataUpdate.image) {
                setPreviewImage(dataUpdate.image)
            }
        }
    }, [inforYacht]);


    const getYacht = async () => {
        const res = await getYachtById(idYacht);
        if (res && res.data.status === 200 && res.data.success === true) {
            setInforYacht(res.data.data);
        }
    }


    const [dataUpdate, setDataUpdate] = useState(initInforYacht)
    console.log("yacht", inforYacht)


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
                                        placeholder="Name Yacht"
                                        onChange={handleChange}
                                        value={dataUpdate.name}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Label>Hull-Body</Form.Label>
                                    <Form.Control
                                        name='hullbody'
                                        type="text"
                                        placeholder="Hull-Body"
                                        onChange={handleChange}
                                        value={dataUpdate.hullBody}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} >
                                    <Form.Label>Launch</Form.Label>
                                    <Form.Control
                                        name='launch'
                                        type="text"
                                        placeholder="Launch"
                                        onChange={handleChange}
                                        value={dataUpdate.launch}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Label>Itinerary</Form.Label>
                                    <Form.Control
                                        name='itinerary'
                                        type="text"
                                        placeholder="Itinerary"
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
                                        placeholder="Rule"
                                        onChange={handleChange}
                                        value={dataUpdate.rule}
                                    />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    name='description'
                                    as="textarea"
                                    placeholder="Description"
                                    style={{ height: '100px' }}
                                    onChange={handleChange}
                                    value={dataUpdate.description}
                                />
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
                                {previewImage ?
                                    <img src={previewImage} />
                                    :
                                    <span>Update Avartar</span>
                                }
                            </div>

                            <Button className='my-3 text-center'>Update Now</Button>

                        </Form>
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>



        </div>
    );
};

export default ManageInforYacht;