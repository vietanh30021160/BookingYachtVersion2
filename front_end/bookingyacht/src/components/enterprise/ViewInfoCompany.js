import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import './Enterprise.scss';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const getImageApi = `http://localhost:8080/api/customer/file/`

    useEffect(() => {
        axios.get('http://localhost:8080/api/customer/getAllCompany')
            .then(res => {
                setCompanies(res.data.data.filter(c => c.exist === 1));
                setLoading(false);
            })

            .catch(error => {
                setLoading(false);
            })
    }, []);

    if (loading) {
        return <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    }

    return (
        <Container>
            <Row>
                {
                    companies.map(company => (
                        <Col key={company.idCompany} xs={12} md={6} lg={4}>
                            {/* <CompanyCard company={company} getImageApi={getImageApi}/> */}
                            <Card style={{ width: '18rem', margin: '10px' }}>
                                {/* <Card.Img variant="top" src={company.logo !== "0" ? company.logo : 'default-logo.png'} alt="Company Logo" style={{ height: '150px', objectFit: 'contain' }} /> */}
                                <Card.Img src={`${getImageApi}${company.logo}`} alt={company.logo}/>
                                <Card.Body>
                                    <Card.Title>{company.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Address:</strong> {company.address}
                                        <br />
                                        <strong>Email:</strong> {company.email}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    )
}
export default CompanyList;