import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Collapse, Container, Form, ListGroup, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addFeedback, viewBillByIdCustomer } from '../../services/ApiServices';

const Bill = ({ idCustomer }) => {
  const [bills, setBills] = useState([]);
  const [showDetails, setShowDetails] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentBillId, setCurrentBillId] = useState(null);
  const [starRating, setStarRating] = useState(0);
  const [description, setDescription] = useState('');
  const [reviewedBills, setReviewedBills] = useState({});

  const navigate = useNavigate();

  const toggleDetails = (idBooking) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [idBooking]: !prevState[idBooking],
    }));
  };

  const handleStarClick = (star) => {
    setStarRating(star);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('starRating', starRating);
    formData.append('description', description);
    formData.append('date', new Date().toLocaleDateString());
    try {
      await addFeedback(currentBillId, idCustomer, formData);
      setReviewedBills((prev) => ({
        ...prev,
        [currentBillId]: { starRating, description },
      }));
      setShowModal(false);
      setStarRating(0);
      setDescription('');
    } catch (error) {
      console.error('Error adding feedback:', error);
    }
  };

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await viewBillByIdCustomer(idCustomer);
        setBills(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBills();
  }, [idCustomer]);

  return (
    <Container className="my-4">
      <Row>
        {bills.map((bill, index) => (
          <Col key={index} sm={12} md={6} className="mb-4">
            <Card>
              <Card.Header className="text-center">
                <h2>Thông tin hóa đơn</h2>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <Card.Text>
                      <strong>Thời gian đặt:</strong> {new Date(bill.bookingOrderDTO.bookingTime).toLocaleString()}
                    </Card.Text>
                    <Card.Text>
                      <strong>Số tiền:</strong> {bill.bookingOrderDTO.amount.toLocaleString()} VND
                    </Card.Text>
                    <Card.Text>
                      <strong>Trạng thái:</strong> {bill.bookingOrderDTO.status}
                    </Card.Text>
                    <Card.Text>
                      <strong>Khách hàng:</strong> {bill.bookingOrderDTO.customerDTO.fullName}
                    </Card.Text>
                  </Col>
                  <Col>
                    <Card.Text>
                      <strong>Địa chỉ:</strong> {bill.bookingOrderDTO.customerDTO.address}
                    </Card.Text>
                    <Card.Text>
                      <strong>Số điện thoại:</strong> {bill.bookingOrderDTO.customerDTO.phone}
                    </Card.Text>
                    <Card.Text>
                      <strong>Email:</strong> {bill.bookingOrderDTO.customerDTO.email}
                    </Card.Text>
                  </Col>
                </Row>

                <Button variant="link" onClick={() => toggleDetails(bill.bookingOrderDTO.idBooking)}>
                  {showDetails[bill.bookingOrderDTO.idBooking] ? 'Ẩn chi tiết' : 'Xem chi tiết'}
                </Button>
                <Collapse in={showDetails[bill.bookingOrderDTO.idBooking]}>
                  <div>
                    <hr />
                    <h5>Thông tin phòng</h5>
                    {bill.bookingOrderDTO.rooms.map((room, roomIndex) => (
                      <ListGroup variant="flush" key={roomIndex} className="mb-2">
                        <ListGroup.Item><strong>Phòng {roomIndex + 1}:</strong></ListGroup.Item>
                        <ListGroup.Item><strong>Diện tích:</strong> {room.area} m²</ListGroup.Item>
                        <ListGroup.Item><strong>Mô tả:</strong> {room.description}</ListGroup.Item>
                        <ListGroup.Item><strong>Tên phòng:</strong> {room.name}</ListGroup.Item>
                        <ListGroup.Item><strong>Giá:</strong> {room.price.toLocaleString()} VND</ListGroup.Item>
                      </ListGroup>
                    ))}
                    <hr />
                    <h5>Dịch vụ</h5>
                    {bill.bookingOrderDTO.services.map((service, serviceIndex) => (
                      <ListGroup variant="flush" key={serviceIndex} className="mb-2">
                        <ListGroup.Item><strong>Dịch vụ:</strong> {service.service}</ListGroup.Item>
                        <ListGroup.Item><strong>Giá:</strong> {service.price.toLocaleString()} VND</ListGroup.Item>
                      </ListGroup>
                    ))}
                    <hr />
                    <h5>Thông tin du thuyền</h5>
                    <Card.Text>
                      <strong>Tên du thuyền:</strong> {bill.bookingOrderDTO.yachtName}
                    </Card.Text>
                    <hr />
                    <h5>Thông tin giao dịch</h5>
                    <Card.Text>
                      <strong>Số tiền:</strong> {bill.transactionDTO.amount.toLocaleString()} VND
                    </Card.Text>
                    <Card.Text>
                      <strong>Ngày giao dịch:</strong> {new Date(bill.transactionDTO.transactionDate).toLocaleString()}
                    </Card.Text>
                    <Card.Text>
                      <strong>Trạng thái:</strong> {bill.transactionDTO.status}
                    </Card.Text>
                    <Card.Text>
                      <strong>Mã giao dịch nhận:</strong> {bill.transactionDTO.receiverBankTranNo}
                    </Card.Text>
                    <Card.Text>
                      <strong>Mã giao dịch gửi:</strong> {bill.transactionDTO.senderBankTranNo}
                    </Card.Text>
                  </div>
                </Collapse>
                <Button
                  variant="primary"
                  className="mt-3"
                  onClick={() => {
                    if (reviewedBills[bill.bookingOrderDTO.idBooking]) {
                      navigate(`/mainpage/${bill.bookingOrderDTO.yachtId}`);
                    } else {
                      setCurrentBillId(bill.bookingOrderDTO.idBooking);
                      setShowModal(true);
                    }
                  }}
                >
                  {reviewedBills[bill.bookingOrderDTO.idBooking] ? 'Xem đánh giá' : 'Đánh giá sản phẩm'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Đánh giá sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleReviewSubmit}>
            <Form.Group controlId="rating">
              <Form.Label>Chất lượng</Form.Label>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{ color: starRating >= star ? 'orange' : 'gray', cursor: 'pointer', fontSize: '1.5rem' }}
                    onClick={() => handleStarClick(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </Form.Group>
            <Form.Group controlId="review">
              <Form.Label>Đánh giá của bạn</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="dark" type="submit">
              Gửi
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Bill;
