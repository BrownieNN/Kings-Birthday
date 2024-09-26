// src/components/ConfirmationModal.js
import React from 'react';
import '../App.css'; // Create this CSS file for styles if needed

const ConfirmationModal = ({ onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Dishonour the king?</h2>
        <div className="modal-buttons">
          <button className="secondary-btn" onClick={onConfirm}>Yes</button>
          <button className="primary-btn" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
