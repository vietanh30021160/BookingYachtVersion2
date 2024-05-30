import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import './Blog.scss';

const HeaderComponent = () =>{
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users');
        setUsers(response.data.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='headerBlog'>
      {renderTitle()}
      {renderSubtitle()}
      <div className='blogCart'>
        {users.map(renderUser)}
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
    </div>
  );
}

const renderUser = (user) => {
  return (
    <Col md={3} className='cart'>
      <Card style={{ width: '23rem' }} className='cart-1'>
      <div className='img-cart'>
        <div className='img-cart-1'>
          <Card.Img className='ima img-fluid w-100' variant="top" src={`${user.avatar}`} />
        </div>
      </div>
      <div className='body-cart'>
        <Card.Body>
          <Card.Title>{user.first_name} {user.last_name}</Card.Title>
          <Card.Text>
            Email: {user.email}
          </Card.Text>
          <Button variant="primary">{user.id}</Button>
        </Card.Body>
      </div>
      </Card>
    </Col>
  );
};

export default HeaderComponent;
