import React from 'react';

const ContactFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="contact-footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="#" target="_blank" rel="noopener noreferrer">ArtStation</a>
        </div>
        <div className="footer-copy">
          &copy; {currentYear} Yangerila Studio. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;