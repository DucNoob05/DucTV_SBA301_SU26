import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function OrchidDetailModal({ show, orchid, onClose }) {
  return (
    <>
      <div style={{ display: 'none' }}>
        {orchid && <img src={orchid.image} alt={orchid.orchidName} />}
      </div>
      <Modal show={show} onHide={onClose} animation={false}>
        <Modal.Header>
          <Modal.Title>{orchid ? orchid.orchidName : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orchid && (
            <>
              <img src={orchid.image} alt={orchid.orchidName} className="img-fluid mb-3" />
              <p>{orchid.description}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrchidDetailModal;
