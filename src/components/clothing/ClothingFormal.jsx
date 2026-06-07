import React, { useRef } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import ProfilePopup from '../layout/ProfilePopup';
import InfoButton from '../layout/InfoButton';
import '../../index.css';

import bgVideo from '../../assets/formal.mp4';
import AccessoriesBW from '../../assets/Accessories_bw.png';
import AccessoriesColor from '../../assets/Accessories.png';
import FragranceBW from '../../assets/Fragrance_bw.png';
import FragranceColor from '../../assets/Fragrance.jpg';
import DressesBW from '../../assets/Clothing_cat_bw.png';
import DressesColor from '../../assets/Clothing_cat.jpg';
import WatchesBW from '../../assets/watches_bw.jpg';
import WatchesColor from '../../assets/watches.jpg';
import FootwearBW from '../../assets/Footwear_bw.jpg';
import FootwearColor from '../../assets/Footwear.jpg';

const ClothingFormal = () => {
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
        <div className='video-container-party'>
          <video src={bgVideo} autoPlay loop muted playsInline />
        </div>
      </div>

      <div className='category-intro-text'>
        <h2 className='intro-which'>WHICH ONE</h2>
        <h2 className='intro-wanna'>DO U WANNA</h2>
        <p className='intro-hit'>hit first</p>
      </div>

      <div className='clothing-category-section'>
        {/* Card 1 — Accessories */}
        <div className='clothing-card' onClick={() => navigate('/clothing/formal/accessories')}>
          <div className='clothing-card-wrapper'>
            <img src={AccessoriesBW} alt='Accessories' className='clothing-card-bw' />
            <img src={AccessoriesColor} alt='Accessories hover' className='clothing-card-color' />
          </div>
          <div className='clothing-card-label'>
            <h2>ACCESSORIES</h2>
          </div>
        </div>

        {/* Card 2 — Fragrance */}
        <div className='clothing-card' onClick={() => navigate('/clothing/formal/fragrance')}>
          <div className='clothing-card-wrapper'>
            <img src={FragranceBW} alt='Fragrance' className='clothing-card-bw' />
            <img src={FragranceColor} alt='Fragrance hover' className='clothing-card-color' />
          </div>
          <div className='clothing-card-label'>
            <h2>FRAGRANCE</h2>
          </div>
        </div>

        {/* Card 3 — Dresses */}
        <div className='clothing-card' onClick={() => navigate('/clothing/formal/dresses')}>
          <div className='clothing-card-wrapper'>
            <img src={DressesBW} alt='Dresses' className='clothing-card-bw' />
            <img src={DressesColor} alt='Dresses hover' className='clothing-card-color' />
          </div>
          <div className='clothing-card-label'>
            <h2>DRESSES</h2>
          </div>
        </div>

        {/* Card 4 — Watches */}
        <div className='clothing-card' onClick={() => navigate('/clothing/formal/watches')}>
          <div className='clothing-card-wrapper'>
            <img src={WatchesBW} alt='Watches' className='clothing-card-bw' />
            <img src={WatchesColor} alt='Watches hover' className='clothing-card-color' />
          </div>
          <div className='clothing-card-label'>
            <h2>WATCHES</h2>
          </div>
        </div>

        {/* Card 5 — Footwears */}
        <div className='clothing-card' onClick={() => navigate('/clothing/formal/footwears')}>
          <div className='clothing-card-wrapper'>
            <img src={FootwearBW} alt='Footwears' className='clothing-card-bw' />
            <img src={FootwearColor} alt='Footwears hover' className='clothing-card-color' />
          </div>
          <div className='clothing-card-label'>
            <h2>FOOTWEARS</h2>
          </div>
        </div>
      </div>

      <div className='content-category'>
        <h1>FORMAL</h1>
      </div>


      <Footer ref={footerRef} />
      <Outlet />
    </div>
  );
};

export default ClothingFormal;
