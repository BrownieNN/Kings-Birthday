// lightbox.js
import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from '../assets/emblem.png'; // Assuming the logo path is correct
import closeBtn from '../assets/red-close.svg';
import '../App.css';
import DOMPurify from 'dompurify';

const Lightbox = ({ userName, recipientName, toggleLightbox }) => {

  const generatePDF = async () => {
    const letterheadElement = document.querySelector('.letterhead');
    const canvas = await html2canvas(letterheadElement, { scale: 5 });
    const imgData = canvas.toDataURL('image/jpeg', 1);
    const sanitizedUserName = DOMPurify.sanitize(userName);
    const sanitizedRecipientName = DOMPurify.sanitize(recipientName);

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    doc.text(`Dear ${sanitizedRecipientName || '[Chief\'s Name]'}`, 10, 20);
    doc.text(`Kind regards, ${sanitizedUserName || '[Your Name]'}`, 10, 280);

    doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);
    doc.save('Kings_Official_Letterhead.pdf');
  };

  return (
    <div className="lightbox-overlay">
      <div className="lightbox-content">
      <div className="lightbox-actions">
        <h2>OFFICIAL LETTERHEAD</h2>
        <button className="primary-btn" onClick={generatePDF}>Download PDF</button>
        </div>
        <div className="letterhead">
          <img src={logo} alt="Logo" className="logo" />
          <p>Dear {recipientName || '[Chief\'s Name]'}</p>
          <p>As you know, the public holiday substitution clause in our workplace agreement permits employees to request a swap of public holidays for dates of personal or cultural importance, subject to employer approval.</p>
          <p>The King’s Birthday public holiday will be observed on 7 October, this year. However, as a proud Queenslander, I choose to recognise the true “King” – Sir Wally Lewis of Lang Park - not the figure who resides in a castle in England, but a rugby league legend whose glorious moustache and highlight reel is unmatched.</p>
          <p>With King Wally’s birthday being Sunday, December 1st, I am writing to request a substitution of the King’s Birthday public holiday with Monday, 2 December, affording me sufficient time to honour King Wally’s legacy with an extended weekend – similar to the long weekend we enjoy for King Charles III of Windsor.</p>
          <p>I respectfully invite you to approve this request.</p>
          <p>Kind regards,<br />{userName || '[Your Name]'}</p>
          <div className="disclaimer">
          This document is officially sanctioned by the Office of Lang Park & endorsed by the true “King” Sir Wally Lewis  
          </div>
        </div>
        <img src={closeBtn} alt="close" className="close-btn" onClick={toggleLightbox} />
      </div>
    </div>
  );
};

export default Lightbox;