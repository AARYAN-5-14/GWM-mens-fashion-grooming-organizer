import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = forwardRef((props, ref) => {
  const navigate = useNavigate();

  return (
    <footer className='footer' ref={ref} {...props}>
      <div className='footer-content'>
        <div className='footer-brand'>
          <h1 className='footer-logo'>GWM</h1>
          <p className='footer-tagline'>STYLE LIKE A MEN</p>
          <hr className='footer-divider' />
          <p className='footer-copyright'>&copy; 2025 GWM. All rights reserved.</p>
          <p className='footer-contact'>contact@gwm.com</p>
        </div>
        <div className='footer-links-container'>
          <div className='footer-column'>
            <h3>EXPLORE</h3>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/grooming'); }}>Grooming</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/clothing'); }}>Clothing</a></li>
            </ul>
          </div>
          <div className='footer-column'>
            <h3>FOLLOW</h3>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">YouTube</a></li>
              <li><a href="#">Pinterest</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
