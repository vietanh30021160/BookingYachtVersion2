import logo from '../../assets/logo_swp.png';
import './Auth.scss'
import { useState } from 'react';
import { login } from '../../services/ApiServices';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux';
import { ImSpinner10 } from "react-icons/im";
// import { Rlogin } from '../../redux/action/CustomerAction';
import { BiSolidHome } from "react-icons/bi";

const Signin = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    // const account = useSelector(state => state.account.account)
    // const validateEmail = (e) => {
    //     return String(e)
    //         .toLowerCase()
    //         .match(
    //             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //         );
    // };
    // const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogin = async () => {
        if (userName === '' || password === '') {
            toast.error('Invalid');
            setLoading(false);
        }
        setLoading(true);
        let res = await login(userName, password);
        console.log(res);
        // if (res.status === 200) {
        //     //dispatch(Rlogin(res.data));
        //     toast.success("Login Successful");
        //     setLoading(false);
        //     navigate('/');

        // } else {
        //     toast.error('username invalid')
        //     setLoading(false);

        // }
    }

    return (
        <>
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <NavLink to='/' className='navbar-brand' style={{ width: '150px' }}><img src={logo} className="img-fluid" alt="logo" /></NavLink>
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 text-center">
                            <h1 className='text-center'>Đăng Nhập</h1>

                            <div className="form-outline mb-4">
                                <input type="text"
                                    placeholder='UserName'
                                    className="form-control form-control-lg"
                                    value={userName}
                                    onChange={(event) => setUserName(event.target.value)}
                                />
                            </div>
                            <div className="form-outline mb-4 show-password">
                                <input type={showPassword === true ? 'text' : 'password'}
                                    placeholder='Password'
                                    className="form-control form-control-lg"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <i className={showPassword === true ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}
                                    onClick={() => setShowPassword(!showPassword)}
                                ></i>
                            </div>
                            <div className='account d-flex'>
                                <div>
                                    Chưa có tài khoản <Link to='/signup'>Đăng kí</Link>
                                </div>
                                <NavLink to='/forgotpassowd'>Quên mật khẩu?</NavLink>
                            </div>
                            <div>

                                <button
                                    style={{ width: '100%' }}
                                    onClick={() => handleLogin()}
                                    className='btn btn-primary'
                                    disabled={loading}
                                >
                                    {loading === true && <ImSpinner10 className='loaderIcon' />}
                                    <span>Đăng nhập</span>
                                </button>
                                <Link to='/' className='my-5' style={{ textDecoration: "none" }}><BiSolidHome className='mb-1' />Home</Link>
                            </div>


                        </div>
                    </div>
                </div>
            </section>
        </>

    );
};

export default Signin;