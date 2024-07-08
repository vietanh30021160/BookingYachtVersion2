import React, { useEffect, useState } from 'react';
import './Home.scss';
import { Button, Col, FormControl, FormGroup, Row, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { SEARCH_YACHT } from '../../redux/type/Type';
import { login } from './../../services/ApiServices';
import { YachtListReducer } from './../../redux/reducer/YachtListReducer';
import { useSearchTrigger } from './TriggerFormSearch';

const FormSearch = () => {
    const dispatch = useDispatch();
    const { selectedLocation } = useSelector(state => state.YachtListReducer);
    const { trigger } = useSearchTrigger();
    console.log("selectedLocation:", selectedLocation)

    const [searchData, setSearchData] = useState({
        name: '',
        location: selectedLocation || 'all',
        // price: 'all',
    });

    console.log(searchData)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchData({
            ...searchData,
            [name]: value
        })
    };

    useEffect(() => {
        dispatch({
            type: SEARCH_YACHT,
            payload: searchData
        });
    }, [searchData, dispatch]);

    useEffect(() => {
        // This effect will run once when trigger changes
        dispatch({
            type: SEARCH_YACHT,
            payload: searchData
        });
    }, [trigger, dispatch, searchData]);

    const hanldeSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: SEARCH_YACHT,
            payload: searchData
        });
    }

    return (
        <div>
            <div className='homepage-content container '>
                <form className='mb-3 serach-yacht p-4' onSubmit={hanldeSubmit}>
                    <div className='text-center'>
                        <h3 style={{ fontWeight: 'bold' }}>Bạn lựa chọn du thuyền Hạ Long nào ?</h3>
                        <p>Có rất nhiều du thuyền dành cho bạn</p>
                    </div>
                    <div className='form-search'>
                        <Row>
                            <Col md={7}>
                                <FormGroup>
                                    <FormControl
                                        placeholder='Search Yacht'
                                        type='text'
                                        name='name'
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <select className='select p-2 pe-3' name='location' onChange={handleChange} style={{ color: '#595C5F' }} value={searchData.location}>
                                    <option value='all'>Tất cả các địa điểm</option>
                                    <option value='Hạ Long'>Vịnh Hạ Long</option>
                                    <option value='Lan Hạ'>Vịnh Lan Hạ</option>
                                    <option value='Cát Bà'>Đảo Cát Bà</option>
                                </select>

                            </Col>
                            {/* <Col>
                                <select className='select p-2' name='price' onChange={handleChange} style={{ color: '#595C5F' }} value={searchData.price}>
                                    <option value='all'>Tất cả các mức giá</option>
                                    <option value='1 Đến 3 Triệu'>1 Đến 3 Triệu</option>
                                    <option value='3 Đến 6 Triệu'>3 Đến 6 Triệu</option>
                                    <option value='Trên 6 Triệu'>Trên 6 Triệu</option>
                                </select>
                            </Col> */}
                            <Col md={2}>
                                <button style={{ paddingLeft: '30px', paddingRight: '30px' }} size='lg'>Search</button>
                            </Col>
                        </Row>

                    </div>
                </form>
            </div >

        </div >
    )
};

export default FormSearch;