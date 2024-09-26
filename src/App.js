// App.js
import React, { useState } from 'react';
import Composer from './components/composer';
import Lightbox from './components/lighbox'; // Ensure the correct import name
import CountdownClock from './components/countdownClock';
import ConfirmationModal from './components/modal'; // Import the modal
import Lockup from './assets/lockup.svg';
import Logo from './assets/logo.png';
import './App.css';

function App() {
  const [isComposerVisible, setIsComposerVisible] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for the modal
  const [userName, setUserName] = useState('');
  const [recipientName, setRecipientName] = useState('');

  const toggleComposer = () => {
    if (isComposerVisible) {
      setShowModal(true); // Show modal if composer is already visible
    } else {
      setIsComposerVisible(true); // Show composer
    }
  };

  const handleDiscardConfirm = () => {
    setIsComposerVisible(false);
    setShowModal(false); // Close modal
  };

  const handleDiscardCancel = () => {
    setShowModal(false); // Close modal without discarding
  };

  const toggleLightbox = () => {
    setIsLightboxOpen(!isLightboxOpen);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="left-column">
          <div className='sports-pick-logo'>
            <img src={Logo} alt="Sporst Pick"/>
          </div>
        <img src={Lockup} alt="Description of the SVG" style={{ width: '100%', height: 'auto' }} />
          <p>
            Use the public holiday substitution clause for a day off to celebrate King Wally. 
          </p>
          <CountdownClock />
          <button className="show-composer-btn" onClick={toggleComposer}>
            {isComposerVisible ? 'Discard email' : 'Email your boss'}
          </button>
        </div>

        <div className={`right-column composer-wrapper ${isComposerVisible ? 'slide-up' : 'slide-down'}`}>
          {isComposerVisible && (
            <Composer 
              toggleComposer={toggleComposer} 
              setUserName={setUserName} 
              setRecipientName={setRecipientName}
              toggleLightbox={toggleLightbox}
            />
          )}
        </div>
      </div>

      {isLightboxOpen && (
        <Lightbox 
          userName={userName} 
          recipientName={recipientName} 
          toggleLightbox={toggleLightbox} 
        />
      )}

      {showModal && (
        <ConfirmationModal 
          onClose={handleDiscardCancel} 
          onConfirm={handleDiscardConfirm} 
        />
      )}
    </div>
  );
}

export default App;