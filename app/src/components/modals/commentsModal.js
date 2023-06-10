import { useState } from 'react';
import { Modal, Card, Button } from 'react-bootstrap';
import { MdClose } from 'react-icons/md';

function CommentsModal(props) {
    const show = props.show
    const setShowCommentsModal = props.setShowCommentsModal

    const handleClose = () => setShowCommentsModal(false);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <Card.Title>Not Interested</Card.Title>
            <Card.Text>No comments.</Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
}

export default CommentsModal;
