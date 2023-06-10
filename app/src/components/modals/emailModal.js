import { useState } from 'react';
import { Modal, Card } from 'react-bootstrap';
import { BsCheckCircle } from 'react-icons/bs';

function EmailModal(props) {
    const show = props.show
    
    const setShowSuccessModal = props.setShowSuccessModal

    const handleClose = () => setShowSuccessModal(false);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className='flex flex-col	 items-center'>
        <Card>
          <Card.Body className="text-center">
            <BsCheckCircle size={60} color="gree"  className="flex w-[100%]" />
            <p>Link successfully sent tot your registered email!</p>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
}

export default EmailModal;
