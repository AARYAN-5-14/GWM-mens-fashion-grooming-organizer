import React, { useRef } from 'react';
import { useNavigate , Outlet } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import family from '../assets/family_gathering.mp4';
import Hair from '../assets/Hair.jpeg';
import Beard from '../assets/Beard.jpeg';
import pic_1 from '../assets/pic_1.png';
import pic_2 from '../assets/pic_2.png';
import Footer from './layout/Footer';
import Navbar from './layout/Navbar';
import ProfilePopup from './layout/ProfilePopup';
import InfoButton from './layout/InfoButton';
import '../index.css';

const Family = () => {
  const category = CATEGORIES.find(c => c.id === 'family');
  const navigate = useNavigate();
  const footerRef = useRef(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='main'>
      <InfoButton onClick={scrollToFooter} />

      <ProfilePopup />

      <div className='heading'>
        <Navbar className='navbar-bread-form' />
        <div className='video-container-family'>
          <video src={category.videoSrc} autoPlay loop muted playsInline />
        </div>
      </div>

      <div className='category-intro-text'>
        <h2 className='intro-which'>WHICH ONE</h2>
        <h2 className='intro-wanna'>DO U WANNA</h2>
        <p className='intro-hit'>hit first</p>
      </div>

      <div className='category-section'> 
        <div className='category-hair' onClick={() => navigate(category.hairRoute)}>
          <div className='category-img-wrapper'>
            <img src={Hair} alt='hair' className='base-img' />
            <img src={pic_1} alt='hair hover' className='hover-img' />
          </div>
          <div className='category-hair-label'>
            <h2>HAIR</h2>   
          </div>
        </div>

        <div className='category-beard' onClick={() => navigate(category.beardRoute)}>
          <div className='category-img-wrapper'>
            <img src={Beard} alt='beard' className='base-img' />
            <img src={pic_2} alt='beard hover' className='hover-img' />
          </div>
          <div className='category-beard-label'> 
            <h2>BEARD</h2>     
          </div>
        </div>
      </div>

      <div className='content-category-family'>
        <h1>{category.title}</h1>
      </div>
      
      <Footer ref={footerRef} />
      <Outlet />
    </div>
  );
};

export default Family;