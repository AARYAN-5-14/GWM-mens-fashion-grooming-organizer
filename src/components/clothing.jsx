import React from 'react';

import { useNavigate, Outlet } from 'react-router-dom';
import party from '../assets/party.mp4';
import formal from '../assets/formal.mp4';
import date from '../assets/date.mp4';
import family from '../assets/family_gathering.mp4';

const Clothing = () => {
  const navigate = useNavigate();
  
  return (
    <div className='main'>
      <div className='video-container'>
        <div className='video-wrapper' onClick={() => navigate('party')}>
          <video src={party} autoPlay loop muted playsInline />
          <div className='overlay' > </div>
          <div className='category-label-clothing'>
            <h2>Party</h2>
          </div>
        </div>
        <div className='video-wrapper' onClick={() => navigate('formal')}>
          <video src={formal} autoPlay loop muted playsInline />
          <div className='overlay' > </div>
          <div className='category-label-clothing'>
            <h2>Formal</h2>
          </div>
        </div>
        <div className='video-wrapper' onClick={() => navigate('date')}>
          <video src={date} autoPlay loop muted playsInline />
          <div className='overlay' > </div>
          <div className='category-label-clothing'>
            <h2>Date</h2>
          </div>
        </div>
        <div className='video-wrapper' onClick={() => navigate('family')}>
          <video src={family} autoPlay loop muted playsInline />
          <div className='overlay' > </div>
          <div className='category-label-clothing'>
            <h2>Family-Meet</h2>
          </div>
        </div>
      </div>
      <div className='content_clothing'>
        <h1>CLOTHING</h1>
        <p>Whats your Occasion</p>
      </div>
      <div className='navbar' onClick= {() => navigate('/')}>
        <h1>GWM</h1>
      </div>

      {/* Nested route content will render here */}
      
      <Outlet />
    </div>
  );
};

export default Clothing;