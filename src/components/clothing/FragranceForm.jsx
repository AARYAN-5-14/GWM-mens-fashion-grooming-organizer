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
import previewImg from '../../assets/Fragrance.jpg';

// Reference images
import skinToneImg from '../../assets/skin tone.jpg';

// Form options
import { seasonOptions, skinToneOptions } from '../../data/formOptions';

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

const FragranceForm = ({ occasion }) => {
  const navigate = useNavigate();
  const footerRef = useRef(null);
  
  const [season, setSeason] = useState(null);
  const [skinTone, setSkinTone] = useState(null);
  const [preview, setPreview] = useState(null);

  const bgVideo = videoMap[occasion] || partyVideo;

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!season || !skinTone) {
      alert('Please fill all fields');
      return;
    }
    const combination = `clothing_${occasion}_fragrance_${season?.value}_${skinTone?.value}`;
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
          <h2>FRAGRANCE</h2>
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
                  2. Select your skin tone:
                </label>
                <Select
                  options={skinToneOptions}
                  value={skinTone}
                  onChange={setSkinTone}
                  placeholder='Choose skin tone...'
                  className='select-box'
                  styles={customSelectStyles}
                />
              </div>
              <button
                type='button'
                className='inline-btn'
                onClick={() => setPreview('skintone')}
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
          {preview === 'skintone' && (
            <img 
              src={skinToneImg} 
              alt='skin tone reference' 
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

export default FragranceForm;
