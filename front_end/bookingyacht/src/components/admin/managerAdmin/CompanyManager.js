import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import './Manager.scss';

const CompanyManager = () => {
    const [companies, setCompanies] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [showCompanyModal, setShowCompanyModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchCompanies();
    }, []);

    const getAuthHeader = () =>{
        const token = localStorage.getItem('token');
        return token ? `Bearer ${token}` : '';
    };

    const fetchCompanies = async () => {
        try {
           const config ={
            method : 'get',
            url : 'http://localhost:8080/api/admins/getAllCompany',
            headers : {
                'Authorization' : getAuthHeader()
            }
           };
           const response = await axios(config);
           setCompanies(response.data.data);
           setFilteredCompanies(response.data.data);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    const handleSearchCompany = value => {
        setSearchTerm(value);
        const filtered = companies.filter(company =>
            company.accountDTO.username.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCompanies(filtered);
    };

    const handleCreateCompany = async event => {
        event.preventDefault();
        const form = event.currentTarget;
        const username = form.elements.username.value;
        const password = form.elements.password.value;
        const FormData = require('form-data');
        let data = new FormData();
        data.append('username', username);
        data.append('password',  password);
        try{
            const config ={
                method : 'post',
                url : 'http://localhost:8080/api/admins/accounts',
                headers: {
                    'Authorization': getAuthHeader(),
                    // 'Content-Type': 'application/json'
                },
                data : data
            };
            const response = await axios(config);
            console.log('Company created successfully:', response.data);
            fetchCompanies();
        }catch (error){
            console.error('Error creating company:', error);
        }
        setShowCompanyModal(false);
    };

    const handleDeleteCompany = companyId => {
        // Add delete company logic here
    };

    const handleCloseDetailModal = () => setShowDetailModal(false);
    const handleShowDetailModal = (company) => {
        setSelectedCompany(company);
        setShowDetailModal(true);
    };

    return (
        <div className="container mt-5">
            <h1>Admin Manager</h1>

            <h2>Company Accounts</h2>
            <div className="d-flex mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search company by name or email"
                    value={searchTerm}
                    onChange={e => handleSearchCompany(e.target.value)}
                />
                <Button variant="primary" onClick={() => setShowCompanyModal(true)} className="ml-2">
                    Create Company Account
                </Button>
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Exist</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCompanies.map(company => (
                        <tr key={company.idCompany}>
                            <td>{company.idCompany}</td>
                            <td>{company.name}</td>
                            <td>{company.address}</td>
                            <td>{company.email}</td>
                            <td>
                                {company.exist === 1 ? (
                                    <h5>Online</h5>
                                ) : (
                                    <h5 style={{color: "red"}}>Offline</h5>
                                )}
                            </td>
                            <td className='button_mana'>
                                <Button variant="primary" onClick={() => handleShowDetailModal(company)}>View Detail</Button>
                                <Button variant="dark" onClick={() => handleDeleteCompany(company.id)}>Hidden</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showCompanyModal} onHide={() => setShowCompanyModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Company Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCreateCompany}>
                        <Form.Group controlId="formCompanyUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username" name="username" required />
                        </Form.Group>
                        <Form.Group controlId="formCompanyPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" name="password" required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showDetailModal} onHide={handleCloseDetailModal} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Company Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCompany && (
                        <>
                            <p><strong>ID:</strong> {selectedCompany.accountDTO.idAccount}</p>
                            <p><strong>Username:</strong> {selectedCompany.accountDTO.username}</p>
                            <p><strong>Password:</strong> {selectedCompany.accountDTO.password}</p>
                            <p><strong>Role:</strong> {selectedCompany.accountDTO.role}</p>
                            {/* Add other company details here */}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetailModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CompanyManager;
