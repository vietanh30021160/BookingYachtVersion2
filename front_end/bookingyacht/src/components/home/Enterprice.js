import i_content from '../../assets/image_1.webp';
import partner1 from '../../assets/partner1.png';
import partner2 from '../../assets/partner2.png';
import partner3 from '../../assets/partner3.png';
import partner4 from '../../assets/partner4.png';
import partner5 from '../../assets/partner5.png';
import partner6 from '../../assets/partner6.png';

const Enterprice = (props) => {
    return (
        <div className='p-5'>
            <div className='enterprice-header row'>
                <div className='enterprice-title col-md mx-4'>
                    <h4 style={{ fontWeight: 'bold', fontSize : '30px' }}>Danh Gia Tu Đối tác Cùng các
                        <br /> Hãng Du thuyền Lớn</h4>
                    <div>
                        <img src={i_content} />
                    </div>
                </div>
                <p style={{ width: "500px", color : '#475467', fontSize : '18px'}} className='col-md mx-4'>
                    Đối tác hàng đầu với các hãng du thuyền danh tiếng: Ưu đãi độc quyền dành riêng cho bạn
                </p>
            </div>
            <div className='img-enterprice container'>
                <div>
                    <img src={partner1} />
                </div>
                <div>
                    <img src={partner2} />
                </div>
                <div>
                    <img src={partner3} />
                </div>
                <div>
                    <img src={partner4} />
                </div>
                <div>
                    <img src={partner5} />
                </div>
                <div>
                    <img src={partner6} />
                </div>
            </div>
        </div>
    )
}

export default Enterprice;