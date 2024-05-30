import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo_swp.png'
const Footer = () => {
    return (
        <div className="footer-content row">
            <div className='content-1 col-md-3'>
                <img alt='logo' src={logo} />
                <label>Công ty TNHH Du Lịch và Dịch Vụ Cây xăng 39<br />
                    <br />Thôn 3 Thạch Hòa Thạch Thất Hà Nội<br />
                    <br />Mã số doanh nghiệp:9999999 do <br />
                    Sở Kế hoạch và Đầu tư Thành phố <br />Hà Nội cấp ngày 05/06/2024
                </label>
            </div>
            <div className='col-md'>
                <div className='content-2 row'>
                    <div className='body col-md'>
                        <span>Gioi Thieu</span>
                        <NavLink className='nav-link'>Lien He</NavLink>
                        <NavLink className='nav-link'>Ve Chung Toi</NavLink>
                        <NavLink className='nav-link'>Hotline</NavLink>
                        <NavLink className='nav-link'>Email:PhamIchBo13082003@gmail.com</NavLink>
                    </div>
                    <div className='body col-md'>
                        <span>Diem Den</span>
                        <NavLink className='nav-link'>Vinh Ha Long</NavLink>
                        <NavLink className='nav-link'>Dao Cat Ba</NavLink>
                        <NavLink className='nav-link'>Vinh Lan Ha</NavLink>
                    </div>
                    <div className='body col-md'>
                        <span>Du Thuyen</span>
                        <NavLink className='nav-link'>Blog</NavLink>
                        <NavLink to='/quy-dinh-chung' className='nav-link'>Quy Dinh Chung</NavLink>
                        <NavLink to='/cau-hoi-thuong-gap' className='nav-link'>Cau Hoi Thuong Gap</NavLink>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Footer;