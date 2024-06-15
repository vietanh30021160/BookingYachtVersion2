import React, { useState } from 'react';
import logo from '../../assets/logo_swp.png'
import { register, registerCustomer } from '../../services/ApiServices';
import { toast } from 'react-toastify';
import { Link, NavLink, useNavigate } from 'react-router-dom';
const Signup = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confrimPassword, setConfirmpassword] = useState('')

    const navigate = useNavigate();

    const handleRegister = async () => {
        let res = await registerCustomer(userName, password);
        if (userName === '' || password === '' || confrimPassword === '') {
            toast.error('Input not empty')
        }
        else if (password !== confrimPassword) {
            toast.error('Confirm Passwod fail');
        }
        else if (res && res.data.status === 200 && res.data.success === true) {
            toast.success('register success')
            // navigate('/information')
        } else {
            toast.error('create fail')
        }
        console.log(res);
    }
    return (
        <div >
            <section className="vh-100" style={{ backgroundColor: '#eee' }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: 25 }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                            <form className="mx-1 mx-md-4">

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text"
                                                            placeholder='UserName'
                                                            className="form-control"
                                                            value={userName}
                                                            onChange={(event) => setUserName(event.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw" />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password"
                                                            placeholder='Password'
                                                            className="form-control"
                                                            value={password}
                                                            onChange={(event) => setPassword(event.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fa-solid fa-key fa-lg me-3"></i>
                                                    <div className="form-outline flex-fill mb-0 mx-1">
                                                        <input type="password"
                                                            placeholder='Confirm Password'
                                                            className="form-control"
                                                            value={confrimPassword}
                                                            onChange={(event) => setConfirmpassword(event.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                {/* <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" hidden value={() => setRole('customer')} className="form-control" />
                                                    </div>
                                                </div> */}
                                                Have an account
                                                <Link to='/signin'>Signin</Link>
                                                <div className="d-flex justify-content-center my-2 mx-4 mb-3 mb-lg-4">
                                                    <button type="button"
                                                        className="btn btn-primary btn-lg"
                                                        onClick={() => handleRegister()}
                                                    >Register</button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <NavLink to='/' className='nav-link'><img src={logo} className="img-fluid" alt="logo" /></NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Signup;