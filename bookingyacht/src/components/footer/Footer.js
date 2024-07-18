import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo_swp.png'
const Footer = () => {
    return (
        <div className="footer-content row" style={{ fontWeight: 'bold', backgroundColor: '#101828' }}>
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
                        <span>Giới Thiệu</span>
                        <NavLink className='nav-link'>Liên Hệ</NavLink>
                        <NavLink className='nav-link'>About Me</NavLink>
                        <NavLink className='nav-link'>Hotline</NavLink>
                        <NavLink className='nav-link'>Email:YachtCrise@gmail.com</NavLink>
                    </div>
                    <div className='body col-md'>
                        <span>Điểm Đến</span>
                        <NavLink className='nav-link'>Vịnh Hạ Long</NavLink>
                        <NavLink className='nav-link'>Đảo Cát Bà</NavLink>
                        <NavLink className='nav-link'>Vịnh Lan Hạ</NavLink>
                    </div>
                    <div className='body col-md'>
                        <span>Du Thuyền</span>
                        <NavLink className='nav-link'>Blog</NavLink>
                        <NavLink to='/yacht-rule' className='nav-link'>Quy Định Chung</NavLink>
                        <NavLink to='/yacht-question' className='nav-link'>Câu Hỏi Thường Gặp</NavLink>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Footer;