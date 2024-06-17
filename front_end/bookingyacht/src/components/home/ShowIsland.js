import i_content from '../../assets/image_1.webp';
import './Home.scss';
import Card from 'react-bootstrap/Card';
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import HaLong from '../../assets/Ha-Long.webp';
import LanHa from '../../assets/vinh-lan-ha.jpg';
import CatBa from '../../assets/Intro-Cat-Ba.webp';
const ShowIsland = () => {
    return (
        <>
            <div className='island-header text-center my-5'>
                <div className='yacht-title'>
                    <h2 style={{ fontWeight: 'bold' }}>Các điểm đến của Yacht Cruise</h2>
                </div>
                <p>
                    Khám phá vẻ đẹp tuyệt vời của Du thuyền Hạ Long: Hành trình đến thiên đường thiên nhiên
                </p>
                <div>
                    <img src={i_content} />
                </div>
            </div>
            <div className='island-body row'>
                <NavLink to='/duthuyen' className='nav-link col-12 col-sm-6 col-md-3 mb-4'>
                    <Card style={{ height: '330', width: '320' }}>
                        <Card.Img variant="top" src={HaLong} />
                        <Card.Body>
                            <Card.Title>Vịnh Hạ Long</Card.Title>
                            <button className='btn btn-outline-dark'>View</button>
                        </Card.Body>
                    </Card>
                </NavLink>

                <NavLink to='/duthuyen' className='nav-link col-12 col-sm-6 col-md-3 mb-4'>
                    <Card style={{ height: '330', width: '320' }}>
                        <Card.Img variant="top" src={CatBa} />
                        <Card.Body>
                            <Card.Title>Đảo Cát Bà</Card.Title>
                            <button className='btn btn-outline-dark'>View</button>
                        </Card.Body>
                    </Card>
                </NavLink>

                <NavLink to='/duthuyen' className='nav-link col-12 col-sm-6 col-md-3 mb-4'>
                    <Card >
                        <Card.Img variant="top" src={LanHa} style={{ height: 220 }} />
                        <Card.Body>
                            <Card.Title>Vịnh Lan Hạ</Card.Title>
                            <button className='btn btn-outline-dark'>View</button>
                        </Card.Body>
                    </Card>
                </NavLink>
            </div>
        </>
    )
}

export default ShowIsland;