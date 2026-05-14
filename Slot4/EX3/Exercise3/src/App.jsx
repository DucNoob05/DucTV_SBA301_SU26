import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Row, Col, Card, Button } from 'react-bootstrap';

// Import dữ liệu
import orchidsData from './data/orchidsData';
import listBanner from './data/banner';

// Import component (chú ý thư mục 'component' số ít theo ảnh của bạn)
import TopCarousel from './component/TopCarousel';

function App() {
  return (
    <div className="App">
      {/* 1. Navbar */}
      <Navbar expand="lg" className="bg-dark navbar-dark">
        <Container>
          <Navbar.Brand href="#">Single Page Application</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#orchids">Link</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* 2. Banner tự động chạy */}
      <TopCarousel banners={listBanner} />

      {/* 3. Danh sách hoa lan */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Danh sách hoa lan</h2>
        <Row>
          {orchidsData.map((orchid) => (
            <Col md={3} sm={6} key={orchid.id} className="mb-4">
              <Card className="h-100 shadow">
                <Card.Img 
                  variant="top" 
                  src={orchid.avatar} 
                  style={{ height: '250px', objectFit: 'cover' }} 
                />
                <Card.Body className="text-center">
                  <Card.Title>{orchid.name}</Card.Title>
                  <Card.Text className="text-muted">{orchid.category}</Card.Text>
                  <Button variant="outline-primary">Xem chi tiết</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;