import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import i_content from '../../assets/image_1.webp';
import './Blog.scss';
import blogData from './DataBlog';
const HeaderComponent = () =>{
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    setBlog(blogData);
  }, [blogData]);


  return (
    <div className='headerBlog'>
      {renderTitle()}
      {renderSubtitle()}
      <div className='blogCart'>
        {blog.map(renderBlog)}
      </div>
    </div>
  );
}

const renderTitle = ()=> {
  return (
    <div className='title'>
      <h4>
        Hạ Long: Khám phá Sự đặc sắc <br />
        và Cập nhật tin tức mới nhất
      </h4>
    </div>
  );
}

const renderSubtitle = () =>{
  return (
    <div>
      <label className='lg'>
        Hạ Long: Bí mật và Cuộc sống trong Vịnh - Khám phá và Cập
        <br />
        nhật những tin tức hấp dẫn từ điểm đến tuyệt vời này.
      </label>
      <br/>
      <img src={i_content} className='lg'/>
    </div>
  );
}

const renderBlog = (blog) => {
  return (
    <Col md={3} className='cart'>
      <Card style={{ width: '23rem' }} className='cart-1'>
      <div className='img-cart'>
        <div className='img-cart-1'>
          <Card.Img className='ima img-fluid w-100' variant="top" src={`${blog.image}`}/>
        </div>
      </div>
      <div className='body-cart'>
        <Card.Body>
          <Card.Title className='title-blog'>{blog.title}</Card.Title>
          <Card.Text className='text-card'>
           {blog.description}
          </Card.Text>
          <Card.Text>{blog.date}</Card.Text>
        </Card.Body>
      </div>
      </Card>
    </Col>
  );
};

export default HeaderComponent;
