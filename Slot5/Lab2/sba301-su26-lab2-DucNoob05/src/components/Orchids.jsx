import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { OrchidsData } from '../shared/ListOfOrchids';
import OrchidCard from './OrchidCard';
import OrchidDetailModal from './OrchidDetailModal';

function Orchids() {
  const [show, setShow] = useState(false);
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  const handleShow = (orchid) => {
    setSelectedOrchid(orchid);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Container className="my-4">
      <Row>
        {OrchidsData.map((orchid) => (
          <Col md={3} className="mb-4" key={orchid.id}>
            <OrchidCard orchid={orchid} onShowDetail={handleShow} />
          </Col>
        ))}
      </Row>
      <OrchidDetailModal show={show} orchid={selectedOrchid} onClose={handleClose} />
    </Container>
  );
}

export default Orchids;
