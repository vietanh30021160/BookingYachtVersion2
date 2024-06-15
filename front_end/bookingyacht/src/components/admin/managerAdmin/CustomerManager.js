import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton, Modal, Table } from 'react-bootstrap';
import './Manager.scss';

const CustomerManager = () => {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [pagedCustomers, setPagedCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchName, setSearchName] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [sortOption, setSortOption] = useState({ key: 'idCustomer', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [paging, setPaging] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    useEffect(() => {
        updatePaging();
    }, [filteredCustomers]);

    const getAuthHeader = () => {
        const token = localStorage.getItem('token');
        return token ? `Bearer ${token}` : '';
    };

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
            const data = response.data.data;
            setCustomers(data);
            setFilteredCustomers(data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const updatePaging = () => {
        const totalPages = Math.ceil(filteredCustomers.length / 10);
        setPaging(Array.from({ length: totalPages }, (_, i) => i + 1));
        setPagedCustomers(filteredCustomers.slice((currentPage - 1) * 10, currentPage * 10));
    };

    const handleSearchByName = value => {
        setSearchName(value);
        const filtered = customers.filter(customer =>
            customer.fullName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCustomers(filtered);
        setCurrentPage(1);
    };

    const handleSearchByEmail = value => {
        setSearchEmail(value);
        const filtered = customers.filter(customer =>
            customer.email.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCustomers(filtered);
        setCurrentPage(1);
    };

    const handleDeleteCustomer = customerId => {
        // Add delete customer logic here
        // setIsChange(!isChange);
    };

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (customer) => {
        setSelectedCustomer(customer);
        setShowModal(true);
    };

    const handleSortChange = (key, direction) => {
        setSortOption({ key, direction });
        sortCustomers(key, direction);
    };

    const sortCustomers = (key, direction) => {
        const sortedCustomers = [...filteredCustomers].sort((a, b) => {
            if (key === 'idCustomer') {
                return direction === 'asc'
                    ? a[key] - b[key]
                    : b[key] - a[key];
            } else {
                if (a[key].toLowerCase() < b[key].toLowerCase()) {
                    return direction === 'asc' ? -1 : 1;
                }
                if (a[key].toLowerCase() > b[key].toLowerCase()) {
                    return direction === 'asc' ? 1 : -1;
                }
                return 0;
            }
        });

        setFilteredCustomers(sortedCustomers);
        setCurrentPage(1);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    useEffect(() => {
        setPagedCustomers(filteredCustomers.slice((currentPage - 1) * 10, currentPage * 10));
    }, [currentPage, filteredCustomers]);

    return (
        <div className="container mt-5">
            <h1>Admin Manager</h1>
            <h2>Customer Accounts</h2>
            <div className="d-flex mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search customer by username"
                    value={searchName}
                    onChange={e => handleSearchByName(e.target.value)}
                />
            </div>
            <div className="d-flex mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search customer by email"
                    value={searchEmail}
                    onChange={e => handleSearchByEmail(e.target.value)}
                />
            </div>
            <div className="d-flex mb-3">
                <DropdownButton id="dropdown-basic-button" title="Sort Options">
                    <Dropdown.Item onClick={() => handleSortChange('idCustomer', 'asc')}>ID Ascending</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange('idCustomer', 'desc')}>ID Descending</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange('fullName', 'asc')}>Name Ascending</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange('fullName', 'desc')}>Name Descending</Dropdown.Item>
                </DropdownButton>
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
                    {pagedCustomers.map(customer => (
                        <tr key={customer.idCustomer}>
                            <td>{customer.idCustomer}</td>
                            <td>{customer.fullName}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                            <td className='button_mana'>
                                <Button variant="info" onClick={() => handleShowModal(customer)}>View Detail</Button>
                                <Button variant="danger" onClick={() => handleDeleteCustomer(customer.accountDTO.idAccount)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div>
                {paging.map(page => (
                    <Button
                        key={page}
                        style={{ marginLeft: 5 }}
                        onClick={() => handlePageChange(page)}
                        className='btn-dark'
                    >
                        {page}
                    </Button>
                ))}
            </div>
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
