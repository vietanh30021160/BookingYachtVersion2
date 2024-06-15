import axios from 'axios';
import { useState } from 'react';
import { BiSolidHome } from "react-icons/bi";
import { ImSpinner10 } from "react-icons/im";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo_swp.png';
import './Auth.scss';

const LoginAdmin = ({setIsLoggedIn}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const handleLogin = async () => {
        setLoading(true);
        setError('');

        const data = new FormData();
        data.append('username', email);
        data.append('password', password);

        const config = {
            method: 'post',
            url: 'http://localhost:8080/login/signin',
            data: data
        };

        try {
            const response = await axios(config);
            console.log(response);
            // Trích xuất token từ phản hồi
            const token = response.data.data;

            // Kiểm tra token
            if (token) {
                // Lưu token vào localStorage
                localStorage.setItem('token', token);
                setIsLoggedIn(true);
                // Điều hướng tới trang dashboard hoặc bất kỳ trang bảo vệ nào khác
                navigate('/dashboard');
            } else {
                setError('Không nhận được token từ phản hồi.');
            }
        } catch (error) {
            setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
        } finally {
            setLoading(false);
        }
    };

    const getAuthHeader = () => {
        const token = localStorage.getItem('token');
        return token ? `Bearer ${token}` : '';
    };

    const someProtectedAction = async () => {
        const config = {
            method: 'get',
            url: 'http://localhost:8080/protected/resource', // URL của API được bảo vệ
            headers: { 
                'Authorization': getAuthHeader()
            }
        };

        try {
            const response = await axios(config);
            // Xử lý phản hồi từ API được bảo vệ
            console.log(response.data);
        } catch (error) {
            // Xử lý lỗi
            console.error('Lỗi khi truy cập tài nguyên được bảo vệ', error);
        }
    };

    return (
        <>
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <NavLink to='/' className='navbar-brand' style={{ width: '150px' }}>
                                <img src={logo} className="img-fluid" alt="logo" />
                            </NavLink>
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 text-center">
                            <h1 className='text-center'>Đăng Nhập</h1>

                            <div className="form-outline mb-4">
                                <input type="text"
                                    placeholder='Tên đăng nhập'
                                    className="form-control form-control-lg"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>
                            <div className="form-outline mb-4 show-password">
                                <input type={showPassword ? 'text' : 'password'}
                                    placeholder='Mật khẩu'
                                    className="form-control form-control-lg"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <i className={showPassword ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}
                                    onClick={() => setShowPassword(!showPassword)}
                                ></i>
                            </div>

                            {error && <div className="alert alert-danger" role="alert">{error}</div>}

                            <div>
                                <button
                                    style={{ width: '100%' }}
                                    onClick={handleLogin}
                                    className='btn btn-primary'
                                    disabled={loading}
                                >
                                    {loading && <ImSpinner10 className='loaderIcon' />}
                                    <span>Đăng nhập</span>
                                </button>
                                <Link to='/' className='my-5' style={{ textDecoration: "none" }}>
                                    <BiSolidHome className='mb-1' />Trang chủ
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LoginAdmin;
