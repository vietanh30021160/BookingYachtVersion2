import i_content from '../../assets/image_1.webp';
import Carousel from 'react-bootstrap/Carousel';
const Feedback = (props) => {
    return (
        <>
            <div className='feedback-header row'>
                <div className='yacht-title col-md mx-4'>
                    <h4>Danh Gia Tu Nhung <br /> Nguoi Trai Nghiem</h4>
                    <div>
                        <img src={i_content} />
                    </div>
                </div>
                <p style={{ width: "500px" }} className='col-md mx-4'>
                    Khách hàng chia sẻ về những kỷ niệm tuyệt vời trên chuyến du lịch với chúng tôi.
                </p>
            </div>

            <div className='feedback-body'>
                <Carousel>
                    <Carousel.Item interval={3000}>
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </>

    )
}
export default Feedback;