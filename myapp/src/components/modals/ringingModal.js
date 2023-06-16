import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
// import { useRouter } from 'next/navigation';
import SuccessModal from './successModal';
import { useNavigate } from 'react-router-dom';


const RingingModal = (props) => {
  const navigate = useNavigate()
  const id = props.id
  const source = props.source;
  const show = props.show
  const setShow = props.setShow
  const [textareaValue, setTextareaValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleTextareaChange = (e) => setTextareaValue(e.target.value);
  const handleDateChange = (e) => setDateValue(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    try {
      const token = sessionStorage.getItem("tmToken")?.length ? sessionStorage.getItem("tmToken") : localStorage.getItem("tmToken")
      console.log("ringing modal")
      const response = await axios.post("https://admin.tradingmaterials.com/api/staff/move-enquiry",
        {
          client_id: id,
          source: source,
          destination: "RINGING",
          date: dateValue,
          description: textareaValue
        }
        , {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      console.log(response)
      setShowSuccessModal(true)
      navigate("/enquiry/ringing-enquiry#")
      
      // window.location.reload()
      handleClose();
    } catch (error) {
      console.log("error", error)
    }

  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enquiry Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="textareaInput">
              <Form.Label>Textarea Input</Form.Label>
              <Form.Control as="textarea" value={textareaValue} onChange={handleTextareaChange} />
            </Form.Group>
            <Form.Group controlId="dateInput">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={dateValue} onChange={handleDateChange} />
            </Form.Group>
            <Button className='mt-[20px mb-[20px' variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <SuccessModal show={showSuccessModal} setShowSuccessModal={setShowSuccessModal} />
    </div>
  );
};

export default RingingModal;
