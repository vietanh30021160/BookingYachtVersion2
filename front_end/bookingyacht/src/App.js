import { Outlet } from "react-router-dom";
import '../src/components/home/Home.scss';
import Footer from './components/footer/Footer';
import Header from "./components/header/Header";

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


    </>

  );
}

export default App;
