import React from 'react';
import {useNavigate , Outlet } from 'react-router-dom';
import party from '../assets/party.mp4';
import Hair from '../assets/Hair.jpeg';
import Beard from '../assets/Beard.jpeg';
import '../index.css';
const Party = () => {
  const navigate = useNavigate();
  return (
    <div className='main'>
      <div className ='video-container-party'>
        
          <video src={party} autoPlay loop muted playsInline />
      </div>
      


      <div className='category-section'>    
  <div className='category-hair' onClick={() => navigate('/grooming/party/HairForm')}>
    <img src={Hair} alt='hair' />
    <div className='category-hair-label'>
      <h2>Hair</h2>   
    </div>
  </div>

  <div className='category-beard' onClick={() => navigate('/grooming/party/BeardForm')}>
    <img src={Beard} alt='beard' />
    <div className='category-beard-label'> 
      <h2>Beard</h2>     
    </div>
  </div>
  </div>
      <div className='content-category'>
      <h1>PARTY</h1>
      </div>
            <div className='navbar' onClick= {() => navigate('/')}>
        <h1>GWM</h1>
      </div> 
      
    <Outlet />
    </div>
  );
};

export default Party;