import React, { useState, useRef } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import ProfilePopup from '../layout/ProfilePopup';
import InfoButton from '../layout/InfoButton';
import Footer from '../layout/Footer';
import '../../index.css';

// Videos
import partyVideo from '../../assets/party.mp4';
import formalVideo from '../../assets/formal.mp4';
import dateVideo from '../../assets/date.mp4';
import familyVideo from '../../assets/family_gathering.mp4';

// Preview image
import previewImg from '../../assets/watches.jpg';

// Reference images
import wristSizeImg from '../../assets/wrist size.png';

// Form options
import { seasonOptions, wristSizeOptions } from '../../data/formOptions';

const videoMap = {
  party: partyVideo,
  formal: formalVideo,
  date: dateVideo,
  family: familyVideo,
};

const customSelectStyles = {
  control: (baseStyles) => ({
    ...baseStyles,
    border: 'none',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    '&:hover': { border: 'none' },
  }),
  dropdownIndicator: (baseStyles) => ({
    ...baseStyles,
    color: '#333',
    '&:hover': { color: '#000' },
  }),
};

const WatchForm = ({ occasion }) => {
  const navigate = useNavigate();
  const footerRef = useRef(null);
  
  const [season, setSeason] = useState(null);
  const [wristSize, setWristSize] = useState(null);
  const [preview, setPreview] = useState(null);

  const bgVideo = videoMap[occasion] || partyVideo;

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!season || !wristSize) {
      alert('Please fill all fields');
      return;
    }
    const combination = `clothing_${occasion}_watches_${season?.value}_${wristSize?.value}`;
    navigate(`/results/${combination}`);
  };

  return (
    <div className='main'>
      <InfoButton onClick={scrollToFooter} />
      <ProfilePopup />

      <div className='heading'>
        <Navbar className='navbar-bread-form' />
        <div className='background-video'>
          <video src={bgVideo} autoPlay loop muted playsInline />
          <h2>WATCHES</h2>
        </div>
      </div>

      <div className='beardform-layout'>
        <div className='form-container'>
          <form className='form-box' onSubmit={handleSubmit}>
            
            <div className='form-group'>
              <div className='select-wrapper'>
                <label className='form-label'>
                  1. Select your season:
                </label>
                <Select
                  options={seasonOptions}
                  value={season}
                  onChange={setSeason}
                  placeholder='Choose season...'
                  className='select-box'
                  styles={customSelectStyles}
                />
              </div>
            </div>

            <div className='form-group with-button'>
              <div className='select-wrapper'>
                <label className='form-label'>
                  2. Select your wrist size:
                </label>
                <Select
                  options={wristSizeOptions}
                  value={wristSize}
                  onChange={setWristSize}
                  placeholder='Choose wrist size...'
                  className='select-box'
                  styles={customSelectStyles}
                />
              </div>
              <button
                type='button'
                className='inline-btn'
                onClick={() => setPreview('wristsize')}
              >
                i
              </button>
            </div>

            <button type='submit' className='submit-btn'>
              See Results
            </button>
          </form>
        </div>

        <div className='preview-container' style={{ flexDirection: 'column' }}>
          {!preview && (
            <img src={previewImg} alt='preview' className='preview-img' />
          )}
          {preview === 'wristsize' && (
            <img 
              src={wristSizeImg} 
              alt='wrist size reference' 
              className='preview-img preview-img-clickable'
              onClick={() => setPreview(null)}
            />
          )}
        </div>
      </div>

      <Footer ref={footerRef} />
    </div>
  );
};

export default WatchForm;
