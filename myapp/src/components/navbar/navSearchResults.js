import { faCalendar, faEnvelope, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

export default function NavSearchResults() {
  return (
    <div className='bg-green-100' >
        <Card className='mt-2 !absolute w-[180%]  !bg-slate-100 ' style={{zIndex: 999}}>
            <Card.Body className='overflow-scroll h-[70vh]'>
            <Card className='mb-3  relative'>
            <Card.Title className=' w-[100%] contents '>
            <Row className='pr-2 pl-2 '>
          <Col>
            
            <h5 className='flex mt-1'><img className='mr-1' src='/images/acquisition.png' width={20} height={20} alt="img"></img>acquisition</h5>
          </Col>
          <Col className="text-end">
            <h5 className='mt-1'> Jameela</h5>
          </Col>
        </Row>
            </Card.Title>
            <Card.Body>
            <Row>
          <Col>
            <div>
              <p><b><FontAwesomeIcon icon={faUser} className='mr-1'/>Name</b>: John Doe</p>
              <p><b><FontAwesomeIcon icon={faEnvelope} className='mr-1'/>Email</b>: johndoe@example.com</p>
            </div>
          </Col>
          <Col className="text-end">
            <p><b><FontAwesomeIcon icon={faPhone} className='mr-1'/>Number</b>: 1234567890</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='mt-3 p-2' style={{"border": "1px solid grey"}}>
              <p><FontAwesomeIcon icon={faCalendar} className='mr-1'/>This is the small text in the second component.</p>
            </div>
          </Col>
        </Row>
            </Card.Body>
            <Card.Footer>Enquiry location</Card.Footer>
        </Card>
        <Card className='mb-3'>
            <Card.Title className=' w-[100%] contents '>
            <Row className='pr-2 pl-2 '>
          <Col>
            
            <h5 className='flex mt-1'><img className='mr-1' src='/images/acquisition.png' width={20} height={20} alt="img"></img>acquisition</h5>
          </Col>
          <Col className="text-end">
            <h5 className='mt-1'> Jameela</h5>
          </Col>
        </Row>
            </Card.Title>
            <Card.Body>
            <Row>
          <Col>
            <div>
              <p><b><FontAwesomeIcon icon={faUser} className='mr-1'/>Name</b>: John Doe</p>
              <p><b><FontAwesomeIcon icon={faEnvelope} className='mr-1'/>Email</b>: johndoe@example.com</p>
            </div>
          </Col>
          <Col className="text-end">
            <p><b><FontAwesomeIcon icon={faPhone} className='mr-1'/>Number</b>: 1234567890</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='mt-3 p-2' style={{"border": "1px solid grey"}}>
              <p><FontAwesomeIcon icon={faCalendar} className='mr-1'/>This is the small text in the second component.</p>
            </div>
          </Col>
        </Row>
            </Card.Body>
            <Card.Footer>Enquiry location</Card.Footer>
        </Card>
        <Card className='mb-3'>
            <Card.Title className=' w-[100%] contents '>
            <Row className='pr-2 pl-2 '>
          <Col>
            
            <h5 className='flex mt-1'><img className='mr-1' src='/images/acquisition.png' width={20} height={20} alt="img"></img>acquisition</h5>
          </Col>
          <Col className="text-end">
            <h5 className='mt-1'> Jameela</h5>
          </Col>
        </Row>
            </Card.Title>
            <Card.Body>
            <Row>
          <Col>
            <div>
              <p><b><FontAwesomeIcon icon={faUser} className='mr-1'/>Name</b>: John Doe</p>
              <p><b><FontAwesomeIcon icon={faEnvelope} className='mr-1'/>Email</b>: johndoe@example.com</p>
            </div>
          </Col>
          <Col className="text-end">
            <p><b><FontAwesomeIcon icon={faPhone} className='mr-1'/>Number</b>: 1234567890</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='mt-3 p-2' style={{"border": "1px solid grey"}}>
              <p><FontAwesomeIcon icon={faCalendar} className='mr-1'/>This is the small text in the second component.</p>
            </div>
          </Col>
        </Row>
            </Card.Body>
            <Card.Footer>Enquiry location</Card.Footer>
        </Card>
            </Card.Body>

        </Card>
        
    </div>
  )
}
