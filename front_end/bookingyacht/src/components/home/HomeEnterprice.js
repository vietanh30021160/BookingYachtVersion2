import i_content from '../../assets/image_1.webp';
import partner1 from '../../assets/partner1.png'
import partner2 from '../../assets/partner2.png'
import partner3 from '../../assets/partner3.png'
import partner4 from '../../assets/partner4.png'
import partner5 from '../../assets/partner5.png'
import partner6 from '../../assets/partner6.png'

const Enterprice = (props) => {
    return (
        <>
            <div className='enterprice-header row'>
                <div className='enterprice-title col-md mx-4'>
                    <h4>Đối tác Cùng các
                        <br /> Hãng Du thuyền Lớn</h4>
                    <div>
                        <img alt='logo' src={i_content} />
                    </div>
                </div>
                <p style={{ width: "500px" }} className='col-md mx-4'>
                    Đối tác hàng đầu với các hãng du thuyền danh tiếng: Ưu đãi độc quyền dành riêng cho bạn
                </p>
            </div>
            <div className='img-enterprice container'>
                <div>
                    <img alt='logo' src={partner1} />
                </div>
                <div>
                    <img alt='logo' src={partner2} />
                </div>
                <div>
                    <img alt='logo' src={partner3} />
                </div>
                <div>
                    <img alt='logo' src={partner4} />
                </div>
                <div>
                    <img alt='logo' src={partner5} />
                </div>
                <div>
                    <img alt='logo' src={partner6} />
                </div>
            </div>
        </>
    )
}

export default Enterprice;