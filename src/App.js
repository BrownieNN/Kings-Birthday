// App.js
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
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
  const [isLeftColumnAnimated, setIsLeftColumnAnimated] = useState(false); // New state for animation

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

  // Trigger left column animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeftColumnAnimated(true);
    }, 100); // Delay to allow the component to mount

    return () => clearTimeout(timer);
  }, []);

  return (
    
    <div className="App">
      <Helmet>
        <title>Celebrate your legal right to honour the real king</title>
        <meta name="description" content="Request to swap the King's birthday public holiday for the real King's Birthday" />
        <meta property="og:title" content="Celebrate your legal right to honour the real king" />
        <meta property="og:description" content="Request to swap the King's birthday public holiday for the real King's Birthday" />
        <meta property="og:image" content="https://therealking.com.au/meta-image.png" />
        <meta property="og:url" content="https://therealking.com.au" />
      </Helmet>
      <div className="container">
      <div className={`left-column ${isLeftColumnAnimated ? 'animate' : ''}`}>
        <div className='sports-pick-logo'>
        <a href="https://sportspick.com.au/" target="_blank" rel="noopener noreferrer">
            <img src={Logo} alt="Sporst Pick"/>
            </a>
          </div>
        <img src={Lockup} alt="Description of the SVG" style={{ width: '80%', height: 'auto', margin:'0px auto' }} />
          <p>
          Request to swap the King's birthday public holiday for the real King's Birthday 
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