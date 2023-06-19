import { Modal, Button } from 'react-bootstrap';

import React from 'react'

export default function TruncateModal(props) {
    console.log(props)
    const showModal = props?.show;
    const handleCloseModal = props?.handleCloseTruncateModal;
    const data= props?.data
  return (
    <>
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
            <Modal.Title>Full Text</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <p>
{data}                </p>

            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
                Close
            </Button>
            </Modal.Footer>
      </Modal>
    </>
  )
}
