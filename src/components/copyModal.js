import React, { useEffect, useState } from 'react';
import '../App.css';

const AlertModal = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose(); // Call onClose to notify the parent component
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`alert-modal ${isVisible ? 'fade-in' : 'fade-out'}`}>
      {message}
    </div>
  );
};

export default AlertModal;
