import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton, Modal, Table } from 'react-bootstrap';
import './Manager.scss';

const CustomerManager = () => {
    // Các biến trạng thái để quản lý dữ liệu khách hàng và trạng thái giao diện người dùng
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [searchName, setSearchName] = useState("");
    const [searchEmail, setSearchEmail] = useState("");


    const [sortOption, setSortOption] = useState({ key: 'idCustomer', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [paging, setPaging] = useState([]);
    const [pagedCustomers, setPagedCustomers] = useState([]);

    
    // Lấy khách hàng khi thành phần được tải
    useEffect(() => {
        fetchCustomers();
    }, []);


    // Cập nhật phân trang mỗi khi danh sách khách hàng được lọc thay đổi
    useEffect(() => {
        updatePaging();
    }, [filteredCustomers]);


    // Hàm lấy tiêu đề xác thực
    const getAuthHeader = () => {
        const token = localStorage.getItem('token');
        return token ? `Bearer ${token}` : '';
    };

    // Hàm lấy khách hàng từ API
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
            // Đặt tất cả khách hàng
            setCustomers(data);
            // Đặt danh sách khách hàng đã lọc
            setFilteredCustomers(data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    // Hàm cập nhật phân trang
    const updatePaging = () => {
        // Tính tổng số trang
        const totalPages = Math.ceil(filteredCustomers.length / 10);
        // Tạo một mảng số trang
        setPaging(Array.from({ length: totalPages }, (_, i) => i + 1));
        // Đặt khách hàng cho trang hiện tại
        setPagedCustomers(filteredCustomers.slice((currentPage - 1) * 10, currentPage * 10));
    };
    // Hàm tìm kiếm khách hàng theo tên
    const handleSearchByName = value => {
        setSearchName(value);
        const filtered = customers.filter(customer =>
            customer.fullName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCustomers(filtered);
        // Đặt lại trang đầu tiên
        setCurrentPage(1);
    };

    // Hàm tìm kiếm khách hàng theo email
    const handleSearchByEmail = value => {
        setSearchEmail(value);
        const filtered = customers.filter(customer =>
            customer.email.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCustomers(filtered);
        // Đặt lại trang đầu tiên
        setCurrentPage(1);
    };

    // Hàm xóa khách hàng
    const handleDeleteCustomer = customerId => {
        // Add delete customer logic here
        // setIsChange(!isChange);
    };

    // Hàm đóng modal
    const handleCloseModal = () => setShowModal(false);

    // Hàm hiển thị modal với chi tiết khách hàng đã chọn
    const handleShowModal = (customer) => {
        setSelectedCustomer(customer);
        setShowModal(true);
    };

    // Hàm thay đổi tùy chọn sắp xếp
    const handleSortChange = (key, direction) => {
        setSortOption({ key, direction });
        sortCustomers(key, direction);
    };

    // Hàm sắp xếp khách hàng theo khóa và hướng
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
        // Đặt lại trang đầu tiên
        setCurrentPage(1);
    };

    // Hàm thay đổi trang hiện tại
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    // Cập nhật danh sách khách hàng trên trang mỗi khi trang hiện tại hoặc danh sách khách hàng đã lọc thay đổi
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
                <DropdownButton id="dropdown-basic-button" title="Sort Options" variant='dark'>
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

            <div style={{ display: 'flex', justifyContent: 'center' }}>
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
