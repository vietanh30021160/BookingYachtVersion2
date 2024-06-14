import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import './Manager.scss';

const CustomerManager = () => {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchCustomers();
    }, []);

    const getAuthHeader = () => {
        const token = localStorage.getItem('token');
        return token ? `Bearer ${token}` : '';
    }

    const fetchCustomers = async () => {
        try {
            const config = {
                method: 'get',
                url: 'http://localhost:8080/api/admins/getAllCustomer',
                headers: {
                    'Authorization': getAuthHeader()
                }
            };
            const response = await axios(config);
            setCustomers(response.data.data);
            setFilteredCustomers(response.data.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleSearchCustomer = value => {
        setSearchTerm(value);
        const filtered = customers.filter(customer =>
            customer.accountDTO.username.includes(value.toLowerCase())
        );
        setFilteredCustomers(filtered);
    };

    const handleDeleteCustomer = customerId => {
        // Add delete customer logic here
    };

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (customer) => {
        setSelectedCustomer(customer);
        setShowModal(true);
    };

    return (
        <div className="container mt-5">
            <h1>Admin Manager</h1>
            <h2>Customer Accounts</h2>
            <div className="d-flex mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search customer by username"
                    value={searchTerm}
                    onChange={e => handleSearchCustomer(e.target.value)}
                />
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map(customer => (
                        <tr key={customer.idCustomer}>
                            <td>{customer.idCustomer}</td>
                            <td>{customer.fullName}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                            <td className='button_mana'>
                                <Button variant="primary" onClick={() => handleShowModal(customer)}>View Detail</Button>
                                <Button variant="dark" onClick={() => handleDeleteCustomer(customer.accountDTO.idAccount)}>Hidden</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleCloseModal} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Customer Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedCustomer && (
                        <>
                            <p><strong>ID:</strong> {selectedCustomer.accountDTO.idAccount}</p>
                            <p><strong>Username:</strong> {selectedCustomer.accountDTO.username}</p>
                            <p><strong>Password:</strong> {selectedCustomer.accountDTO.password}</p>
                            <p><strong>Role:</strong> {selectedCustomer.accountDTO.role}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CustomerManager;
