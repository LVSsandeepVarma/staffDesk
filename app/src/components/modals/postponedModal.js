
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import SuccessModal from './successModal';

const PostponedModal = (props) => {
  const id = props.id
  const source = props.source
  const show = props.show
  const setShow = props.setShow
  const [selectedStage, setSelectedStage] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleStageChange = (e) => setSelectedStage(e.target.value);
  const handleTextareaChange = (e) => setTextareaValue(e.target.value);
  const handleDateChange = (e) => setDateValue(e.target.value);
  const router = useRouter()
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async (e) => {

    e.preventDefault();
    // Handle form submission
    console.log("postponed")
    try {
      const token = sessionStorage?.getItem("tmToken")
      console.log("poastpone modal")
      const response = await axios.post("https://admin.tradingmaterials.com/api/staff/move-enquiry",
        {
          client_id: id,
          source: source,
          destination: "POSTPONED",
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

      router.push("/enquiry/postponed-enquiry#")
      // router.reload()
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
          <Form >
            <Form.Group controlId="stageDropdown">
              <Form.Label>Stage</Form.Label>
              <Form.Select value={selectedStage} onChange={(e)=>handleStageChange(e)}>
                <option value="">Select Stage</option>
                <option value="1">Stage 1</option>
                <option value="2">Stage 2</option>
                <option value="3">Stage 3</option>
              </Form.Select>
            </Form.Group>
            {selectedStage === '1' && (
              <Form.Group controlId="textareaInput">
                <Form.Label>Textarea Input</Form.Label>
                <Form.Control as="textarea" value={textareaValue} onChange={(e)=>handleTextareaChange(e)} />
              </Form.Group>
            )}
            {selectedStage === '2' && (
              <Form.Group controlId="anotherTextareaInput">
                <Form.Label>Another Textarea Input</Form.Label>
                <Form.Control as="textarea" value={textareaValue} onChange={(e)=>handleTextareaChange(e)} />
              </Form.Group>
            )}
            {selectedStage === '3' && (
              <Form.Group controlId="differentTextareaInput">
                <Form.Label>Different Textarea Input</Form.Label>
                <Form.Control as="textarea" value={textareaValue} onChange={(e)=>handleTextareaChange(e)} />
              </Form.Group>
            )}
            <Form.Group controlId="dateInput">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={dateValue} onChange={(e)=>handleDateChange(e)} />
            </Form.Group>
            <Button className='mt-[20px mb-[20px' variant="primary" type="button" onClick={(e)=>{handleSubmit(e)}}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <SuccessModal show={showSuccessModal} setShowSuccessModal={setShowSuccessModal} />

    </div>
  );
};

export default PostponedModal;
