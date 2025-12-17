import React from 'react';
import { useNavigate } from 'react-router-dom';
import clothing from '../assets/clothing.mp4';
import grooming from '../assets/grooming.mp4';
import '../index.css'; // Ensure CSS is imported



const Main = () => {
  const navigate = useNavigate();

  return (
    <div className='main'>
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
      </div>

      <div className='content'>
        <h1>GWM</h1>
        <p>Style like a MEN</p>
      </div>
    </div>

    
  );
};


export default Main;



