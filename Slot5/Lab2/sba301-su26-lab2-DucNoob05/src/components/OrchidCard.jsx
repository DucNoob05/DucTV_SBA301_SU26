import React from 'react';
import { Card, Button } from 'react-bootstrap';

function OrchidCard({ orchid, onShowDetail }) {
  return (
    <Card>
      <Card.Img variant="top" src={orchid.image} />
      <Card.Body>
        <Card.Title>{orchid.orchidName}</Card.Title>
        <Card.Text>{orchid.category}</Card.Text>
        <Button variant="primary" onClick={() => onShowDetail(orchid)}>
          Detail
        </Button>
      </Card.Body>
    </Card>
  );
}

export default OrchidCard;
