import { Container, Row, Col, Card, Badge, Button, Nav } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import { blogPosts, blogCategories } from '../../../data/blogPosts';

export default function BlogList() {
  // TODO 1: Khai báo `searchParams` và `setSearchParams` bằng hook useSearchParams()
  const [searchParams, setSearchParams] = useSearchParams();

  // TODO 2: Lấy giá trị category từ URL search params:
  const activeCategory = searchParams.get('category') || 'Tất cả';

  // TODO 3: Tính biến `filteredPosts`:
  //         - Nếu activeCategory === 'Tất cả': trả về toàn bộ blogPosts
  //         - Ngược lại: lọc các bài có category === activeCategory
  const filteredPosts = activeCategory === 'Tất cả'
    ? blogPosts
    : blogPosts.filter((post) => post.category === activeCategory);

  // TODO 4: Khai báo hàm `handleCategoryChange(category)`:
  //         - Nếu category === 'Tất cả': gọi setSearchParams({}) để xóa search params
  //         - Ngược lại: gọi setSearchParams({ category }) để cập nhật URL
  const handleCategoryChange = (category) => {
    if (category === 'Tất cả') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <Container className="mt-4">
      <h4 className="mb-4">📰 Blog Lập Trình</h4>

      <Nav className="mb-4 flex-wrap gap-2" data-testid="category-nav">
        {blogCategories.map((cat) => (
          <Nav.Item key={cat}>
            <Button
              variant={activeCategory === cat ? 'primary' : 'outline-primary'}
              size="sm"
              data-testid={`blog-category-${cat}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </Button>
          </Nav.Item>
        ))}
      </Nav>

      <div className="mb-3 text-muted" data-testid="active-category">
        Danh mục: {activeCategory} · {filteredPosts.length} bài viết
      </div>

      <Row className="g-4">
        {/* TODO 8: Nếu filteredPosts rỗng, hiển thị "Không có bài viết nào trong danh mục này." */}
        {filteredPosts.length === 0 && (
          <Col xs={12}>
            <p className="text-center w-100">Không có bài viết nào trong danh mục này.</p>
          </Col>
        )}

        {/* TODO 9: Render danh sách filteredPosts */}
        {filteredPosts.map((post) => (
          <Col key={post.id} md={6} lg={4}>
            <Card data-testid={`blog-post-${post.id}`} className="h-100 shadow-sm">
              <Card.Img variant="top" src={post.image} style={{ height: 180, objectFit: 'cover' }} />
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Badge bg="info">{post.category}</Badge>
                  <small className="text-muted">{post.date}</small>
                </div>
                <Card.Title style={{ fontSize: '1rem' }}>{post.title}</Card.Title>
                <Card.Text className="text-muted" style={{ fontSize: '0.85rem' }}>
                  {post.excerpt}
                </Card.Text>
                <small className="text-muted">✍️ {post.author}</small>
              </Card.Body>
              <Card.Footer>
                <Button as={Link} to={`/blog/${post.id}`}
                  variant="outline-primary" size="sm"
                  data-testid={`blog-link-${post.id}`}>
                  Đọc Tiếp →
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
