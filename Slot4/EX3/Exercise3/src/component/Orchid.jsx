import React, { useState } from 'react';
import { Card, Button, Container } from 'react-bootstrap';

const OrchidCarousel = ({ orchids }) => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev === orchids.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? orchids.length - 1 : prev - 1));
  };

  const currentOrchid = orchids[index];

  return (
    <Container className="d-flex flex-column align-items-center mt-4">
      <div className="d-flex align-items-center justify-content-center w-100">
        <Button variant="outline-primary" onClick={handlePrev} className="me-3">❮</Button>

        {/* Sử dụng Card Component từ React-Bootstrap  */}
        <Card style={{ width: '22rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <Card.Img 
            variant="top" 
            src={currentOrchid.image} 
            style={{ height: '400px', objectFit: 'cover' }} 
          />
          <Card.Body className="text-center">
            <Card.Title className="fw-bold">{currentOrchid.name}</Card.Title>
            <Card.Text>
              <strong>Category:</strong> {currentOrchid.category} <br/>
              <small className="text-muted">ID: {currentOrchid.id}</small>
            </Card.Text>
            <Button variant="primary">Detail</Button>
          </Card.Body>
        </Card>

        <Button variant="outline-primary" onClick={handleNext} className="ms-3">❯</Button>
      </div>
      <p className="mt-3">Orchid {index + 1} of {orchids.length}</p>
    </Container>
  );
};

export default OrchidCarousel;