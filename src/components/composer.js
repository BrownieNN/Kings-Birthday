import React, { useState, useEffect } from 'react';
import '../App.css';
import Kingmail from '../assets/kingmail.svg';
import Minus from '../assets/Minus.svg';
import Close from '../assets/Close.svg';
import Resize from '../assets/Resize.svg';
import Thumbnail from '../assets/thumbnail.png';
import Bin from '../assets/bin.svg';
import DOMPurify from 'dompurify';
import ReactGA from "react-ga4";
import CopyModal from "../components/copyModal";


const Composer = ({ toggleComposer, setUserName, setRecipientName, toggleLightbox }) => {
  const [userName, setUserNameState] = useState('');
  const [recipientName, setRecipientNameState] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [emailError, setEmailError] = useState(''); // State for email error message
  const [isFormComplete, setIsFormComplete] = useState(false);
  const sanitizeInput = (input) => DOMPurify.sanitize(input);
  const [isCopyButtonEnabled, setIsCopyButtonEnabled] = useState(false); // State for copy button
  const [alertMessage, setAlertMessage] = useState(''); // State for alert message
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const draftEmail = `Dear ${recipientName || '[Chief\'s Name]'},
    
As you may know, in many workplace agreement contracts there is a public holiday substitution clause that permits employees to request a swap of public holidays for dates of personal or cultural importance, subject to employer approval.

The King’s Birthday public holiday will be observed on 7 October, this year. However, as a proud Queenslander, I choose to recognise the true “King” – Sir Wally Lewis of Lang Park - not the figure who resides in a castle in England, but a rugby league legend whose glorious moustache and highlight reel is unmatched.

With King Wally’s birthday being Sunday, December 1st, I am writing to request a substitution of the King’s Birthday public holiday with Monday, 2 December, affording me sufficient time to honour King Wally’s legacy with an extended weekend – similar to the long weekend we enjoy for King Charles III of Windsor.  

I respectfully invite you to approve this request. 

Kind regards,
${userName || '[Your Name]'}`;

  const handleMailto = () => {
    if (!isValidEmail(recipientEmail)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailError(''); // Clear error if email is valid

    const subject = encodeURIComponent('Request for Public Holiday Substitution');
    const body = encodeURIComponent(draftEmail);
    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(draftEmail).then(() => {
      setAlertMessage("Email template copied!");
      setShowAlert(true); // Show the alert
    });
  };

  const handleCloseAlert = () => {
    setShowAlert(false); // Close the alert
  };


  useEffect(() => {
    if (userName && recipientName && recipientEmail && !emailError) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }

    // Enable the copy button when both "Your Name" and "Chief's Name" are filled out
    if (userName && recipientName) {
      setIsCopyButtonEnabled(true);
    } else {
      setIsCopyButtonEnabled(false);
    }
  }, [userName, recipientName, recipientEmail, emailError]);

  return (
    <div className="composer-container">
      <div className='composer-header'>
        <img src={Kingmail} alt="Kingmail" />
        <div className='button-group'>
          <img src={Minus} alt='Minus' />
          <img src={Resize} alt='Resize' />
          <img src={Close} alt='Close'  onClick={toggleComposer}  />
        </div>
      </div>
      <h2>Formal Request for Public Holiday Substitution</h2>
      <div className="input-group">
        <div className="field-wrapper">
          <input
            required
            type="text"
            placeholder="Your Name"
            onChange={(e) => {
              const sanitizedValue = sanitizeInput(e.target.value);
              setUserNameState(sanitizedValue);
              setUserName(sanitizedValue); 
            }}
          />
        </div>
        <div className="field-wrapper">
          <input
            required
            type="text"
            placeholder="Chief's Name"
            onChange={(e) => {
              const sanitizedValue = sanitizeInput(e.target.value);
              setRecipientNameState(sanitizedValue);
              setRecipientName(sanitizedValue); 
            }}
          />
        </div>
        <div className="field-wrapper">
          <input
            required
            type="email"
            placeholder="Chief's Email"
            value={recipientEmail}
            onChange={(e) => {
              const sanitizedValue = sanitizeInput(e.target.value);
              setRecipientEmail(sanitizedValue);
            }}
          />
        </div>
        {emailError && <p className="error-text">{emailError}</p>} {/* Render error text */}
        <div className="field-wrapper">
          <textarea value={draftEmail} readOnly />
        </div>

        {isFormComplete && (
          <div className="letterhead-info">
            <img src={Thumbnail} alt="Letter thumbnail" />
            <p>The King's Official Letterhead</p>
            <button className="letterhead-button" onClick={toggleLightbox}>
              View & Download
            </button>
          </div>
        )}
      </div>
      <div className="action-bar">
        <img src={Bin} alt="bin icon" className="close-composer-btn" onClick={toggleComposer} />
        <div className="action-group">
        <button
          className="third-btn"
          onClick={() => {
            ReactGA.event({
              category: "Button",
              action: "Copy Template Clicked",
              label: "Copy Template Button",
            });
            handleCopyToClipboard(); // Call the function to copy to clipboard
          }}
          disabled={!isCopyButtonEnabled} // Disable button if the fields are not filled
        >
          Copy
        </button>
        <button
             className="send-button"
             onClick={() => {
               ReactGA.event({
                 category: "Template",
                 action: "Copy Official Template",
                 label: "Copy Template Button",
               });
               handleMailto();
             }}
            >
             Open your email
        </button>
        </div>
        {showAlert && <CopyModal message={alertMessage} onClose={handleCloseAlert} />}
      </div>
    </div>
  );
};

export default Composer;
