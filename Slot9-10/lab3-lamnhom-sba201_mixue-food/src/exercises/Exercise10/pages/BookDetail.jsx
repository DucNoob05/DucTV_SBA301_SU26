import { Container, Row, Col, Card, Badge, Button, ListGroup } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBooksFromStorage } from '../utils/storage';

export default function BookDetail() {
  // TODO 1: Lấy `id` từ URL params bằng useParams()
  const { id } = useParams();

  // TODO 2: Khai báo `navigate` bằng useNavigate()
  const navigate = useNavigate();

  // TODO 3: Gọi getBooksFromStorage() và tìm book có id === Number(id)
  const book = getBooksFromStorage().find((b) => b.id === Number(id));

  // TODO 4: Nếu không tìm thấy book, hiển thị thông báo lỗi và nút quay lại
  if (!book) {
    return (
      <Container className="mt-4" data-testid="book-detail-page">
        <Alert variant="danger">Sách không tồn tại.</Alert>
        <Button onClick={() => navigate('/books')}>Quay lại danh sách</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4" data-testid="book-detail-page">
      <Button
        variant="outline-secondary"
        className="mb-4"
        data-testid="back-to-list-btn"
        onClick={() => navigate('/books')}
      >
        ← Danh Sách Sách
      </Button>

      {/* TODO 6: Render chi tiết sách */}
      <Row className="g-4">
        <Col md={4}>
          <Card.Img src={book.image || 'https://placehold.co/300x400?text=No+Cover'} style={{ borderRadius: 8 }} />
        </Col>
        <Col md={8}>
          <Badge bg={book.available ? 'success' : 'danger'} className="mb-2">
            {book.available ? 'Còn hàng' : 'Hết hàng'}
          </Badge>
          <Badge bg="info" className="mb-2 ms-2">{book.genre}</Badge>
          <h2 data-testid="book-detail-title">{book.title}</h2>
          <ListGroup variant="flush" className="mt-3">
            <ListGroup.Item>✍️ Tác giả: {book.author}</ListGroup.Item>
            <ListGroup.Item>📅 Năm XB: {book.year}</ListGroup.Item>
            <ListGroup.Item>💰 Giá: {book.price.toLocaleString('vi-VN')}đ</ListGroup.Item>
            <ListGroup.Item>🏷️ Thể loại: {book.genre}</ListGroup.Item>
          </ListGroup>
          <div className="d-flex gap-2 mt-4">
            <Button as={Link} to={`/books/edit/${book.id}`}
              variant="warning" data-testid="edit-book-detail-btn">
              ✏️ Sửa
            </Button>
            <Button as={Link} to="/books"
              variant="outline-secondary">
              ← Danh sách
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
