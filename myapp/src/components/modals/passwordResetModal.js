"use client"
import React, { useState, useEffect } from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

const TimedModal = ({ show, handleClose }) => {
    const router = useRouter()
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          handleClose();
          return 0;
        }
        return prevProgress + 10;
      });
    }, 1000);

    return () => {
        
      clearInterval(timer);
      router.push("/login")
    };
  }, [handleClose]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Password Reset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {progress < 100 ? (
          <>
            <p>Resetting password...</p>
            <ProgressBar animated now={progress} />
          </>
        ) : (
          <p>Password reset successful!</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default TimedModal;
