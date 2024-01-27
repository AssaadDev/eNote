import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ content,  divClass }) => {

    useEffect(() => {
        
       
     }, [divClass]);

  return (
    <div
      className={"upper-right-modal "+divClass}
    >
      <div className="upper-right-modal-content">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Modal;