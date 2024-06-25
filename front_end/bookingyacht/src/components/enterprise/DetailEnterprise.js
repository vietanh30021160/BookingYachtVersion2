import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { FaLocationDot } from "react-icons/fa6";
import { RiShipLine } from "react-icons/ri";
import { useNavigate, useParams } from 'react-router-dom';
import banner from '../../assets/_10957b03-6b32-48df-a787-636386d02a8d.jpg';
import '../yacht/FindYacht.scss';
import './Enter.scss';
const ProfilePage = () => {
    const { idCompany } = useParams();
    const navigate = useNavigate();
    const [pagging, setPagging] = useState([]);
    const [paggingYacht, setPaggingYacht] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [yachtList, setYachtList] = useState([]);
    const [company, setCompany] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/customer/yacht/findByCompany/${idCompany}`)
            .then(res => {
                setPaggingYacht(res.data.data)
                setYachtList(res.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [idCompany])

    useEffect(() => {
        if (yachtList.length) {
            const startIndex = (currentPage - 1) * 5;
            const endIndex = startIndex + 5;
            setPaggingYacht(yachtList.slice(startIndex, endIndex));

            const pages = [];
            const num = Math.ceil(yachtList.length / 5);
            for (let i = 1; i <= num; i++) {
                pages.push(i);
            }
            setPagging(pages);
        }
    }, [yachtList, currentPage]);

    const avatarYachtApi = 'http://localhost:8080/api/customer/file/'

    const handelChangePage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const renderPages = () => {
        return pagging.map((page) => {
            return (
                <button key={page}
                    onClick={() => { handelChangePage(page) }}
                    className={page === currentPage ? 'btn btn-dark' : 'btn btn-light'}
                    style={{ margin: '0px 5px 20px 5px' }}
                >{page}
                </button>
            )
        })
    }

    const hanldeSelectedYacht = (idYacht) => {
        navigate(`/mainpage/${idYacht}`);
    }
    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col xs={12} className="text-center cover-photo-container">
                    <Image src={banner} fluid className="cover-photo" />
                    {
                        company.map(company => (
                            <div className="profile-info container">
                                <Image src={company.company.logo} roundedCircle className="profile-photo" />
                                <div className="profile-text">
                                    <h2 style={{ fontWeight: 'bold' }}>{company.company.name}</h2>
                                    <p>1.3K người theo dõi • 900 đang theo dõi</p>
                                </div>
                            </div>
                        ))
                    }

                </Col>
            </Row>
            <Row className="mt-5">
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Giới thiệu</Card.Title>
                            <Card.Text>
                                <p>Trang cá nhân · Người sáng tạo nội dung số</p>
                                <p>Sống tại <strong>Ninh Bình</strong></p>
                                <p>Độc thân</p>
                                <p>pttuan03</p>
                                <p>4.8690 người theo dõi</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={7}>
                    <div style={{ marginLeft: '30px' }}>
                        <h3>Tất cả các thuyền</h3>
                        <div className="infor-body">
                            {
                                paggingYacht.map((yacht) => {
                                    return (
                                        <div className="card row" key={yacht.idYacht} onClick={() => { hanldeSelectedYacht(yacht.idYacht) }} style={{ cursor: 'pointer', marginTop: '20px' }}>
                                            <div className="col-md-5">
                                                <img style={{ height: '250px', width: '100%' }} className="card-img-top object-fit-cover" src={`${avatarYachtApi}${yacht.image}`} alt="Card image cap" />
                                            </div>
                                            <div className="card-body col-md-7">
                                                <div className='card-content'>
                                                    <div style={{ padding: '10px', color: '#475467', width: '80px' }} className='location'><FaLocationDot />{yacht.location.name}</div>
                                                    <h4 className='name' style={{ marginBottom: 0, fontWeight: 'bold' }}>{yacht.name}</h4>
                                                    <p style={{ margin: '0px' }}>Hạ thủy: {yacht.launch} - Vỏ Tàu {yacht.hullBody}</p>
                                                    <div style={{ fontWeight: 'bold' }}> <RiShipLine /> {yacht.itinerary} </div>
                                                    <div className='price d-flex' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <p style={{ color: '#475467', fontWeight: '700' }}>Price: 3.3350.000đ</p>
                                                        <button style={{ borderRadius: 25 }} className='btn btn-warning'>Đặt ngay</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className='d-flex justify-content-center'>
                                {renderPages()}
                            </div>

                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;
