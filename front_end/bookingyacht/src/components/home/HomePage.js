import videoHomePage from '../../assets/duthuyenhalong.mp4';
import Enterprice from './Enterprice';
import Feedback from './Feedback';
import FormSearch from './FormSearch';
import './Home.scss';
import ShowIsland from './ShowIsland';
import ShowYacht from './ShowYacht';

const HomePage = (props) => {

    return (
        <div>
            <div className='homepage-container'>
                <div >
                    <video autoPlay muted loop>
                        <source src={videoHomePage} />
                    </video>
                </div>
                <FormSearch />
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

            <div className='app-enterprice my-5'>
                <Enterprice />
            </div>

        </div>
    )
}
export default HomePage;