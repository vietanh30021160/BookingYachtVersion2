import React from 'react';
import './Home.scss';
import { Button, Col, FormControl, FormGroup, Row } from 'react-bootstrap';

const FormSearch = () => {
    return (
        <div>
            <div className='homepage-content border container '>
                <form className='mb-3 serach-yacht'>
                    <div className='text-center'>
                        <h2>Ban Lua Chon Du Thuyen Ha Long Nao ?</h2>
                        <p>Co Rat Nhieu Tour Du Lich Dang cho Ban</p>
                    </div>
                    <div className='form-search'>
                        <Row>
                            <Col md={5}>
                                <FormGroup>
                                    <FormControl
                                        placeholder='Search Yacht'
                                        type='text'
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <select className='select'>
                                    <option>Tất Cả Địa Điểm</option>
                                    <option>Vịnh Hạ Long</option>
                                    <option>Vịnh Lan Hạ</option>
                                    <option>Đảo Cát Bà</option>

                                </select>

                            </Col>
                            <Col>
                                <select className='select'>
                                    <option>Tất Cả Mức Giá</option>
                                    <option>1 Đến 3 Triệu</option>
                                    <option>3 Đến 6 Triệu</option>
                                    <option>Trên 6 Triệu</option>

                                </select>
                            </Col>
                            <Col>
                                <Button>Search</Button>
                            </Col>
                        </Row>

                    </div>
                </form>
            </div>

        </div>
    );
};

export default FormSearch;