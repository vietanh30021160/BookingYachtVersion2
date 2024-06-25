import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import './Homepage.scss';

const AdminStats = () =>{
    const [customerCount, setCustomerCount] = useState(0);
    const [companyCount, setCompanyCount] = useState(0);
    
  useEffect(() => {
    fetchCompanies();
    fetchCustomers();
  }, []);

  const fetchCompanies = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/admins/getAllCompany', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setCompanyCount(response.data.data.length);
    } catch (error) {
        if (error.response.status === 403) {
            console.log('Access forbidden. Please check your permissions.');
        } else {
            console.log('Error fetching companies: ' + error.message);
        }
    }
};

const fetchCustomers = async () => {
  try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/admins/getAllCustomer', {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      setCustomerCount(response.data.data.length); 
  } catch (error) {
      if (error.response.status === 403) {
          console.log('Access forbidden. Please check your permissions.');
      } else {
          console.log('Error fetching customers: ' + error.message);
      }
  }
};
  return (
    <Container className="my-4 backgroundpage">
    <h1>OverView</h1>
      <Row>
        <Col md={6}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Quantity Customers</Card.Title>
              <Card.Text>
                <h3>{customerCount}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Quantity Companies</Card.Title>
              <Card.Text>
                <h3>{companyCount}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default AdminStats;

