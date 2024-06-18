import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo_swp.png'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { IoCall } from 'react-icons/io5';
const Header = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary header">
            <Container>
                {/* <Navbar.Brand href="#home"></Navbar.Brand> */}
                <NavLink to='/' className='navbar-brand' style={{ width: '150px' }}><img className='logo' src={logo} alt='logo' /></NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/duthuyen" className='nav-link'>Tìm Du Thuyền</NavLink>
                        <NavLink to="/doanhnhiep" className='nav-link'>Doanh Nghiệp</NavLink>
                        <NavLink to="/blog" className='nav-link'>Blog</NavLink>

                    </Nav>
                    <Nav className='d-flex' style={{ gap: 50 }}>
                        <p className='nav-link' style={{ cursor: "pointer" }}><IoCall />Hotline: 0969951736</p>
                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item><NavLink to='/signin' className='nav-link'>Đăng nhập</NavLink></NavDropdown.Item>
                            <NavDropdown.Item>
                                <NavLink to='/signup' className='nav-link'>Đăng ký</NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item><NavLink to='/profile' className='nav-link'>Profile</NavLink></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4" >
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;