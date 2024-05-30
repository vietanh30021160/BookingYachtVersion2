import React from 'react';
import { Route, Routes } from "react-router-dom";
import App from './App';
import HomePage from './components/home/HomePage';
// import FindYacht from './components/yacht/FindYacht';
// import RuleYacht from './components/yacht/RuleYacht';
// import QuestionYacht from './components/yacht/QuestionYacht';
// import Signin from './components/auths/Signin';
// import ManageCompany from './components/companySystem/ManageCompany';
// import Dashboard from './components/companySystem/Dashboard';
// import ViewYacht from './components/companySystem/ViewYacht';
// import ViewFeedback from './components/companySystem/ViewFeedback';
// import ViewBooking from './components/companySystem/ViewBooking';
// import Bill from './components/companySystem/Bill';
// import ViewOwner from './components/companySystem/ViewOwner';
// import Signup from './components/auths/Signup';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Blog from './components/blog/Blog';
import Enterprise from './components/enterprise/Enterprise';
// import Information from './components/auths/Information';
const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path='/blog' element={<Blog/>}/>
                    <Route path='/doanhnhiep' element={<Enterprise/>}/>
                    {/* <Route path='/duthuyen' element={<FindYacht />} />
                    <Route path='/quy-dinh-chung' element={<RuleYacht />} />
                    <Route path='/cau-hoi-thuong-gap' element={<QuestionYacht />} /> */}
                </Route>

                {/* <Route path='/signin' element={<Signin />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/information' element={<Information />} />


                <Route path='/manage-company' element={<ManageCompany />} >
                    <Route index element={<Dashboard />} />
                    <Route path='view-yacht' element={<ViewYacht />} />
                    <Route path='view-feedback' element={<ViewFeedback />} />
                    <Route path='view-booking' element={<ViewBooking />} />
                    <Route path='bill' element={<Bill />} />
                    <Route path='view-owner' element={<ViewOwner />} />
                </Route> */}

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