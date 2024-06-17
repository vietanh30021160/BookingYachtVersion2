import React, { useState } from 'react';
import './Home.scss';
import { Button, Col, FormControl, FormGroup, Row } from 'react-bootstrap';

const FormSearch = () => {
    const init = {
        nameYacht: '',
        location: '',
        price: ''
    }
    const [searchData, setSearchData] = useState(init);
    const handleChange = (e) => {
        setSearchData(
            {
                ...searchData,
                [e.target.name]: e.target.value
            }
        )
    }
    const handleSearch = () => {
        console.log("check search", searchData)
    }

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
                                        name='nameYacht'
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <select className='select' name='location' onChange={handleChange}>
                                    <option value='all'>Tất Cả Địa Điểm</option>
                                    <option value='Vịnh Hạ Long'>Vịnh Hạ Long</option>
                                    <option value='Vịnh Lan Hạ'>Vịnh Lan Hạ</option>
                                    <option value='Đảo Cát Bà'>Đảo Cát Bà</option>

                                </select>

                            </Col>
                            <Col>
                                <select className='select' name='price' onChange={handleChange}>
                                    <option value='all'>Tất Cả Mức Giá</option>
                                    <option value='1 Đến 3 Triệu'>1 Đến 3 Triệu</option>
                                    <option value='3 Đến 6 Triệu'>3 Đến 6 Triệu</option>
                                    <option value='Trên 6 Triệu'>Trên 6 Triệu</option>

                                </select>
                            </Col>
                            <Col>
                                <Button onClick={() => handleSearch()}>Search</Button>
                            </Col>
                        </Row>

                    </div>
                </form>
            </div>

        </div>

    );
};

export default FormSearch;