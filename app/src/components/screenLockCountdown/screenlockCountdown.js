import React, { useState, useEffect } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

const CountdownTimer = () => {
  const router = useRouter()
  const [countdown, setCountdown] = useState(600);
  const [showModal, setShowModal] = useState(false);
  const [lockStatus, setLockStatus] = useState("lock");
  const [userInfo,  setUserInfo] = useState()

  useEffect(() => {
    let intervalId;
    let blinkInterval;
    let timeoutId;

    if (countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    } else {
      setShowModal(true);
    }
    if( countdown >=300){
      const element = document.getElementById("blinkElement");
      element.style.color = "green"
    }
    else if(countdown <=300 && countdown >=10){
      const element = document.getElementById("blinkElement");
      element.style.color = "orange"
    }
    else if(countdown <= 10 && countdown !=0){
        blinkInterval = setInterval(()=>{
          const element = document.getElementById('blinkElement');
          element.style.animation = 'blink 1s infinite';
        })
    }
    else if (lockStatus == "lock" && countdown ==0){
      
      timeoutId = setTimeout(() => {
        router.push("/locked")
      }, 5000); 
      // Redirect to locked page after 5 seconds (adjust as needed)
    }

    

    return () => {
      clearInterval(blinkInterval);
      clearInterval(intervalId);
      clearTimeout(timeoutId)
    };

    
  }, [countdown]);



  const formatTime = () => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleContinue = () => {
    setCountdown(600);
    setShowModal(false);
    setLockStatus("continue")
  };

  const handleLock = () => {
    // Redirect to locked page
    router.push("/locked")
  };

  return (
    <div
      className="container"
      style={{ position: 'fixed', bottom: '20px', left: '20px', zIndex: '9999', width: "fit-content" }}
    >
      <div className="row">
        <div className="col-12">
          <Card>
            <Card.Body className='p-0 pt-2'>
              <Card.Title id="blinkElement" className='m-0 pb-2 pl-2 pr-2'> Idle screen time : {formatTime()}</Card.Title>
              {/* <Card.Text className='text-lg'>{formatTime()}</Card.Text> */}
            </Card.Body>
          </Card>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Times Up!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>What would you like to do?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleContinue}>
            Continue
          </Button>
          <Button variant="secondary" onClick={handleLock}>
            Lock
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CountdownTimer;
