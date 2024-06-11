import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import { Route, Routes } from "react-router-dom";
import App from './App';
import Information from './components/auths/Information';
import Signin from './components/auths/Signin';
import Signup from './components/auths/Signup';
import Bill from './components/company/Bill';
import ManageCompany from './components/company/ManageCompany';
import ViewBooking from './components/company/ViewBooking';
import ViewFeedback from './components/company/ViewFeedback';
import ViewYacht from './components/company/ViewYacht';
import HomePage from './components/home/HomePage';
import YachtQuestion from './components/yacht/YachtQuestion';
import YachtRule from './components/yacht/YachtRule';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './components/auths/ForgotPassword';
import InformationCompany from './components/auths/InformationCompany';
import Blog from './components/blog/Blog';
import ProfileCompany from './components/company/Profile';
import MainPage from './components/detailYacht/mainDetailPage/MainPage';
import Enterprise from './components/enterprise/Enterprise';
import Profile from './components/home/Profile';
import FindYacht from './components/yacht/FindYacht';

import AdminLayout from './components/admin/headerAdmin/AdminLayout';
import CompanyManager from './components/admin/managerAdmin/CompanyManager';
import CustomerManager from './components/admin/managerAdmin/CustomerManager';
import AdminHome from './components/admin/pageAdmin/AdminHome';
const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />

                    <Route path='/blog' element={<Blog />} />
                    <Route path='/doanhnhiep' element={<Enterprise />} />
                    <Route path='maybay' element={<MainPage />} />
                    <Route path='/duthuyen' element={<FindYacht />} />
                    <Route path='/yacht-rule' element={<YachtRule />} />
                    <Route path='/yacht-question' element={<YachtQuestion />} />
                </Route>

                <Route path='/signin' element={<Signin />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/forgotpassowd' element={<ForgotPassword />}></Route>
                <Route path='/information' element={<Information />} />
                <Route path='/information-company' element={<InformationCompany />} />



                <Route path='/manage-company' element={<ManageCompany />} >
                    <Route index element={<ViewBooking />} />
                    <Route path='view-yacht' element={<ViewYacht />} />
                    <Route path='view-feedback' element={<ViewFeedback />} />
                    {/* <Route path='view-booking' element={<ViewBooking />} /> */}
                    <Route path='bill' element={<Bill />} />
                    <Route path='profile' element={<ProfileCompany />} />

                </Route>

                <Route path='/admin' element={<AdminLayout/>}>
                    <Route path='manager' element={<AdminHome/>}/>
                    <Route path="customer" element={<CustomerManager/>} />
                    <Route path="company" element={<CompanyManager/>} />
                </Route>

            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default Layout;