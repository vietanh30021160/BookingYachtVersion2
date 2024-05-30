<<<<<<< Updated upstream
import videoHomePage from '../../assets/Mixivivuduthuyen.mp4'
import ShowYacht from './ShowYacht';
=======
import videoHomePage from '../../assets/video_duthuyen.mp4';
import Enterprice from './Enterprice';
>>>>>>> Stashed changes
import Feedback from './Feedback';
import Enterprice from './Enterprice';
import './Home.scss';
import ShowIsland from './ShowIsland';

const HomePage = (props) => {

    return (
        <div>
            <div className='homepage-container'>
                <div>
<<<<<<< Updated upstream
                    <video autoPlay muted loop>
                        <source src={videoHomePage} />
=======
                    <video autoPlay muted >
                        <source src={videoHomePage} type='video/mp4'/>
>>>>>>> Stashed changes
                    </video>
                </div>
                <div className='homepage-content border container '>
                    <form className='mb-3 serach-yacht'>
                        <div className='text-center'>
                            <h2>Ban Lua Chon Du Thuyen Ha Long Nao ?</h2>
                            <p>Co Rat Nhieu Tour Du Lich Dang cho Ban</p>
                        </div>
                        <div className='form-search'>
                            <div className='d-flex'>
                                {/* <CiSearch /> */}
                                <input type='text' placeholder='Nhap Ten Du Thuyen' className='form-control col-3' />
                            </div>
                            <div>
                                {/* <FaMapMarkerAlt /> */}
                                <select className='form-select'>
                                    <option>1</option>
                                    <option>2</option>
                                </select>
                            </div>
                            <div>
                                <select className='form-select'>
                                    <option>1</option>
                                </select>
                            </div>
                            <button size='lg'>Search</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className='app-yacht container'>
                <ShowYacht />
            </div>


            <div className='feedback-content'>
                <Feedback />
            </div>

            <div className='app-show-island container'>
                <ShowIsland />
            </div>

            <div className='app-enterprice'>
                <Enterprice />
            </div>

            <div className='app-blog'>
                Blog
            </div>

        </div>
    )
}
export default HomePage;