import React, { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton, Modal, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../../../redux/action/AdminAction';
import './Manager.scss';

const CustomerManager = () => {

    const dispatch = useDispatch();
    const customers = useSelector(state => state.admin.customers);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchName, setSearchName] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [searchId, setSearchId] = useState(""); 
    const [searchPhone, setSearchPhone] = useState(""); 
    const [currentPage, setCurrentPage] = useState(1);
    const [paging, setPaging] = useState([]);
    const [pagedCustomers, setPagedCustomers] = useState([]);

    // Lấy khách hàng khi thành phần được tải
    useEffect(() => {
        dispatch(fetchCustomers())
    }, [dispatch]);

    useEffect(() =>{
        setFilteredCustomers(customers);
    }, [customers])

    // Cập nhật phân trang mỗi khi danh sách khách hàng được lọc thay đổi
    useEffect(() => {
        updatePaging();
    }, [filteredCustomers, currentPage]);

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
        filterCustomers(value, searchEmail, searchId, searchPhone);
        // Đặt lại trang đầu tiên
        setCurrentPage(1);
    };

    // Hàm tìm kiếm khách hàng theo email
    const handleSearchByEmail = value => {
        setSearchEmail(value);
        filterCustomers(searchName, value, searchId, searchPhone);
        // Đặt lại trang đầu tiên
        setCurrentPage(1);
    };

    // Hàm tìm kiếm khách hàng theo ID
    const handleSearchById = value => {
        setSearchId(value);
        filterCustomers(searchName, searchEmail, value, searchPhone);
        // Đặt lại trang đầu tiên
        setCurrentPage(1);
    };

    // Hàm tìm kiếm khách hàng theo Phone
    const handleSearchByPhone = value => {
        setSearchPhone(value);
        filterCustomers(searchName, searchEmail, searchId, value);
        // Đặt lại trang đầu tiên
        setCurrentPage(1);
    };

    // Hàm chính để lọc danh sách khách hàng
    const filterCustomers = (name, email, id, phone) => {
        const filtered = customers.filter(customer =>
            customer.fullName.toLowerCase().includes(name.toLowerCase()) &&
            customer.email.toLowerCase().includes(email.toLowerCase()) &&
            customer.idCustomer.toString().includes(id) &&
            customer.phone.includes(phone)
        );
        setFilteredCustomers(filtered);
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
        // setSortOption({ key, direction });
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
            <div>
                <h1>Admin Manager</h1>
                <h2>Customer Accounts</h2>
            </div>
            <div className="d-flex mb-3">
                <div style={{ marginRight: '50px' }}>
                <label>Tìm kiếm theo Id</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search customer by ID"
                        value={searchId}
                        onChange={e => handleSearchById(e.target.value)}
                    />
                </div>
                <div>
                <label>Tìm kiếm theo phone</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search customer by phone"
                        value={searchPhone}
                        onChange={e => handleSearchByPhone(e.target.value)}
                    />
                </div>
            </div>
            <div className="d-flex mb-3">
                <div style={{ marginRight: '50px' }}>
                <label>Tìm kiếm theo tên</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search customer by name"
                        value={searchName}
                        onChange={e => handleSearchByName(e.target.value)}
                    />
                </div>
                <div>
                <label>Tìm kiếm theo email</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search customer by email"
                        value={searchEmail}
                        onChange={e => handleSearchByEmail(e.target.value)}
                    />
                </div>
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
