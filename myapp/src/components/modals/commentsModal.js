import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal, Card, Button } from 'react-bootstrap';
import { BsClock } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { TbCircleDot } from 'react-icons/tb';
import Truncate from 'react-text-truncate';
import TruncateModal from './truncateModal';


function CommentsModal(props) {
    const data = props.data
    const show = props.show
    const setShowCommentsModal = props.setShowCommentsModal
    console.log("hello",data);
    const [showModal, setShowModal] = useState(false);
    const [text, setText] = useState("")

    const handleShowModal = (info) => {
      setShowModal(true);
      setText(info)
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };

    const handleClose = () => setShowCommentsModal(false);

  return (
    <>
    <TruncateModal show={showModal} handleCloseTruncateModal={setShowModal} data={text} />
    <Modal size='lg' className='max-h-50vh overflow-y-scroll' show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body className='!max-h-[60vh]  !overflow-y-scroll'>
            <Card.Title><b>Destination :</b>Not Interested</Card.Title>
            <Card.Text>
              {data?.length &&  data[0]?.map((enq,ind)=>(
                // <p>{ind}</p>
                <div key={`enquiry-${ind}`} className="timeline-item !8903233335 !max-h-[25rem]  !w-[100%] sm: w-[20rem] w-[16rem] sm: w-[18rem] overflow-y-scroll ">
                <div className="timeline-icon ml-5">
                  <TbCircleDot />
                </div>
                <div className="timeline-content ml-15">
                  <div className="ml-5">
                    <div >
                    <p><b>Source:</b> {enq?.source}</p>
                       <span className='!block text-truncate' onMouseOver={()=>handleShowModal(enq?.description)} style={{maxWidth:"150px"}}>{enq?.description}</span>
                      {/* </p> */}
                    </div>
                      <div className="flex ">
                        <BsClock className="clock-icon" />
                        <p className="time">{enq?.updated_at?.split("T")[0]}</p>
        
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </Card.Text>
            <Card.Title><b>Destination :</b>Postponed</Card.Title>
            <Card.Text>
              {data?.length && data[1]?.map((enq,ind)=>(
                // <p>{ind}</p>
                <div key={`enquiry-${ind}`} className="timeline-item !8903233335 !max-h-[25rem]  !w-[100%] sm: w-[20rem] w-[16rem] sm: w-[18rem] overflow-y-scroll ">
                <div className="timeline-icon ml-5">
                  <TbCircleDot />
                </div>
                <div className="timeline-content ml-15">
                  <div className="ml-5">
                    <div >
                      <p><b>Source:</b> {enq?.source}</p>
                       <span className='!block text-truncate' onMouseOver={()=>handleShowModal(enq?.description)} style={{maxWidth:"150px"}}>{enq?.description}</span>
                    </div>
                      <div className="flex ">
                        <BsClock className="clock-icon" />
                        <p className="time">{enq?.date?.split(" ")[0]}</p>
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </Card.Text>
            <Card.Title><b>Destination :</b>Ringing</Card.Title>
            <Card.Text>
              {data?.length && data[2]?.map((enq,ind)=>(
                // <p>{ind}</p>
                <div key={`enquiry-${ind}`} className="timeline-item !8903233335 !max-h-[25rem]  !w-[100%] sm: w-[20rem] w-[16rem] sm: w-[18rem] overflow-y-scroll ">
                <div className="timeline-icon ml-5">
                  <TbCircleDot />
                </div>
                <div className="timeline-content ml-15">
                  <div className="ml-5">
                    <div >
                    <p><b>Source:</b> {enq?.source}</p>
                       <span className='!block text-truncate' onMouseOver={()=>handleShowModal(enq?.description)} style={{maxWidth:"150px"}}>{enq?.description}</span>
                    </div>
                      <div className="flex ">
                        <BsClock className="clock-icon" />
                        <p className="time">{enq?.updated_at?.split("T")[0]}</p>
        
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
    </>

  );
}

export default CommentsModal;
