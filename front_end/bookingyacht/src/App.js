import { Outlet } from "react-router-dom";
import '../src/components/home/Home.scss';
import Footer from './components/footer/Footer';
import Header from "./components/header/Header";
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <div className="app-container">
        <div className='header-container'>
          <Header />
        </div>

        <div className='app-content'>
          <Outlet />
        </div>

        <div className="app-footer">
          <Footer />
        </div>
      </div>

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
}

export default App;
