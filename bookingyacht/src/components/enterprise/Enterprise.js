import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import i_content from '../../assets/image_1.webp';
import Enterprice from '../home/Enterprice';
import '../home/Home.scss';
import './Enterprise.scss';
import ViewInfoCompany from './ViewInfoCompany';
// Component Header
const Header = () => (
  <div className="header">
    <h4>Tour Du thuyền Hạ Long: Kết nối doanh nghiệp, khám phá vẻ đẹp tự nhiên</h4>
    <img src={i_content} />
    <label>Với sự trải nghiệm thực tế, Công ty TNHH Du lịch và Dịch vụ của chúng tôi mong muốn đưa du thuyền Hạ Long trở thành một lựa chọn đầu tiên cho doanh nghiệp. Nhiều chương trình du lịch hấp dẫn, đa dạng được kết hợp sẽ đem đến cho quý doanh nghiệp sự hài lòng và thuận tiện. Du thuyền Hạ Long cũng sẽ là một món quà tri ân vô cùng ý nghĩa dành cho nhân viên của quý doanh nghiệp. Bên cạnh đó, du thuyền Hạ Long còn rất phù hợp cho những cuộc hội thảo, hợp tác đầu tư hay giao lưu của quý doanh nghiệp.</label>
    <button className="btn btn-primary">Liên Hệ Chúng Tôi</button>
  </div>
);

// Component BusinessItem
const BusinessItem = ({ imgSrc, title, description }) => (
  <div className="business-col">
    <div className="business">
      <img src={imgSrc} className="img-fluid" alt="Business" />
      <div className="content-detail">
        <h6>{title}</h6>
        <p>{description}</p>
      </div>
    </div>
  </div>
);

// Component BusinessItems
const BusinessItems = () => (
  <div className="content-2">
    <div className="row">
      <BusinessItem
        imgSrc="https://mixivivu.com/business/business1.png"
        title="Lịch trình phù hợp với yêu cầu của doanh nghiệp"
        description="Du thuyền sẽ sắp xếp lịch trình phù hợp với từng sự kiện của doanh nghiệp: du lịch của công ty tri ân nhân viên, hội thảo hay làm việc với đối tác."
      />
      <BusinessItem
        imgSrc="https://mixivivu.com/business/business2.png"
        title="Đa dạng trong sự lựa chọn các du thuyền"
        description="Tùy vào nhu cầu của doanh nghiệp, chúng tôi sẽ tư vấn cung cấp du thuyền phù hợp về: số lượng phòng nghỉ, boong tàu rộng rãi hay chi phí hợp lý."
      />
      <BusinessItem
        imgSrc="https://mixivivu.com/business/business3.png"
        title="Thời gian linh hoạt"
        description="Chúng tôi sẽ tư vấn thời gian linh hoạt nhất phù hợp với tính chất của sự kiện và lịch làm việc trước và sau chuyến đi của quý doanh nghiệp."
      />
    </div>
  </div>
);

// Component HeaderPage
const HeaderPage = () => (
  <div className="body-page">
    <div className="container">
      <div style={{ padding: '30px' }}>
        <h1 style={{ fontWeight: 'bold', textAlign : 'center' , fontStyle : 'italic'}}>Chào Mừng Bạn Đến Với Các Doanh Nghiệp Lớn Nhất
          <br />
          Và Uy Tín Của Chúng Tôi.</h1>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="content-1">
            <Header />
          </div>
        </div>
        <div className="col-lg-6">
          <BusinessItems />
        </div>
        <div>
          <ViewInfoCompany />
        </div>
      </div>
    </div>
    <div className='app-enterprice'>
      <Enterprice />
    </div>
  </div>
);

export default HeaderPage;
