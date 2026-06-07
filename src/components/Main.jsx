import React, { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import clothing from '../assets/clothing.mp4';
import grooming from '../assets/grooming.mp4';
import '../index.css'; // Ensure CSS is imported
import ProfilePopup from './layout/ProfilePopup';



const Main = () => {
  const navigate = useNavigate();
  const footerRef = useRef(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='main'>
      <div className='info-scroll-container'>
        <button className='info-button' onClick={scrollToFooter}>
          <i>i</i>
        </button>
        <span className='info-text'></span>
      </div>
      <button className='explore-button' onClick={() => navigate('/explore')}>
        Explore
      </button>

      <ProfilePopup />

      <div className='video-container'>
        <div className='video-wrapper' onClick={() => navigate('/clothing')}>
          <video
            src={clothing}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className='overlay' />
          <div className='category-label'>
            <h2>Clothing</h2>
          </div>
        </div>

        <div className='video-wrapper' onClick={() => navigate('/grooming')}>
          <video
            src={grooming}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className='overlay' />
          <div className='category-label'>
            <h2>Grooming</h2>
          </div>
        </div>

        <div className='content'>
          <h1>GWM</h1>
          <p>STYLE LIKE A MEN</p>
        </div>
      </div>

      <footer className='footer' ref={footerRef}>
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
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/clothing'); }}>Clothing</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/grooming'); }}>Grooming</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
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
    </div>
  );
};


export default Main;
