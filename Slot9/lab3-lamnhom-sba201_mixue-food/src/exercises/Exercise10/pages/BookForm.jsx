import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getBooksFromStorage, saveBooksToStorage, getNextId } from '../utils/storage';
import { genres } from '../../../data/books';

const EMPTY_FORM = { title: '', author: '', genre: 'Lập trình', year: '', price: '', available: true };export default function BookForm() {
  // TODO 1: Lấy `id` từ URL params bằng useParams()
  const { id } = useParams();

  // TODO 2: Khai báo `navigate` bằng useNavigate()
  const navigate = useNavigate();

  // TODO 3: Khai báo state `formData` với giá trị khởi tạo EMPTY_FORM
  const [formData, setFormData] = useState(EMPTY_FORM);

  // TODO 4: Khai báo state `error` với giá trị khởi tạo ''
  const [error, setError] = useState('');

  // TODO 5: Dùng useEffect để nạp dữ liệu khi ở chế độ Edit:
  useEffect(() => {
    if (id) {
      const books = getBooksFromStorage();
      const book = books.find((b) => b.id === Number(id));
      if (book) {
        setFormData(book);
      } else {
        navigate('/books');
      }
    }
  }, [id, navigate]);

  // TODO 6: Khai báo hàm `handleChange(e)`:
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // TODO 7: Khai báo hàm `handleSubmit(e)`:
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title?.toString().trim() || !formData.author?.toString().trim() || !formData.year?.toString().trim() || !formData.price?.toString().trim()) {
      setError('Vui lòng điền đầy đủ các thông tin bắt buộc (*)');
      return;
    }

    const yearVal = parseInt(formData.year);
    if (isNaN(yearVal) || yearVal < 1900 || yearVal > 2025) {
      setError('Năm xuất bản phải là số từ 1900 đến 2025');
      return;
    }

    const priceVal = parseFloat(formData.price);
    if (isNaN(priceVal) || priceVal <= 0) {
      setError('Giá sách phải là số dương');
      return;
    }

    setError('');
    const books = getBooksFromStorage();

    if (id) {
      // Edit
      const updatedBooks = books.map((b) =>
        b.id === Number(id) ? { ...b, ...formData, year: yearVal, price: priceVal } : b
      );
      saveBooksToStorage(updatedBooks);
    } else {
      // Add
      const newBook = {
        ...formData,
        id: getNextId(books),
        year: yearVal,
        price: priceVal,
        image: formData.image || 'https://placehold.co/300x400?text=No+Cover'
      };
      saveBooksToStorage([...books, newBook]);
    }

    navigate('/books');
  };

  const isEdit = Boolean(id);

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={7} lg={6}>
          <Card className="shadow-sm" data-testid="book-form">
            <Card.Header className={isEdit ? 'bg-warning text-dark' : 'bg-primary text-white'}>
              <h5 className="mb-0">{isEdit ? '✏️ Sửa Sách' : '+ Thêm Sách Mới'}</h5>
            </Card.Header>

            <Card.Body>
              {/* TODO 8: Nếu error không rỗng, hiển thị <Alert variant="danger">{error}</Alert> */}
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3">
                  <Form.Label>Tên Sách <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    name="title"
                    placeholder="Nhập tên sách..."
                    value={formData.title}
                    onChange={handleChange}
                    data-testid="book-title-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Tác Giả <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    name="author"
                    placeholder="Tên tác giả..."
                    value={formData.author}
                    onChange={handleChange}
                    data-testid="book-author-input"
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Thể Loại</Form.Label>
                      <Form.Select
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        data-testid="book-genre-select"
                      >
                        {genres.filter((g) => g !== 'Tất cả').map((g) => (
                          <option key={g}>{g}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Năm Xuất Bản <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        name="year"
                        type="number"
                        placeholder="2024"
                        value={formData.year}
                        onChange={handleChange}
                        data-testid="book-year-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Giá (VNĐ) <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    name="price"
                    type="number"
                    placeholder="150000"
                    value={formData.price}
                    onChange={handleChange}
                    data-testid="book-price-input"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Check
                    type="checkbox"
                    name="available"
                    label="Còn hàng"
                    checked={formData.available}
                    onChange={handleChange}
                    data-testid="book-available-check"
                  />
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button
                    type="submit"
                    variant={isEdit ? 'warning text-dark' : 'primary'}
                    data-testid="save-book-btn"
                  >
                    {isEdit ? '💾 Lưu Thay Đổi' : '+ Thêm Sách'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => navigate('/books')}
                    data-testid="cancel-book-btn"
                  >
                    Hủy
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
