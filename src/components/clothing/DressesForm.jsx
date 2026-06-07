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
import previewImg from '../../assets/Clothing_cat.jpg';

// Reference images
import skinToneImg from '../../assets/skin tone.jpg';
import bodyComplexImg from '../../assets/body complex.jpg';
import bodyTypeImg from '../../assets/body type.jpg';

// Form options
import { 
  seasonOptions,
  skinToneOptions,
  heightOptions,
  bodyComplexityOptions,
  bodyTypeOptions
} from '../../data/formOptions';

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

const DressesForm = ({ occasion }) => {
  const navigate = useNavigate();
  const footerRef = useRef(null);
  
  const [skinTone, setSkinTone] = useState(null);
  const [height, setHeight] = useState(null);
  const [bodyComplexity, setBodyComplexity] = useState(null);
  const [bodyType, setBodyType] = useState(null);
  const [season, setSeason] = useState(null);
  const [preview, setPreview] = useState(null);

  const bgVideo = videoMap[occasion] || partyVideo;

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!skinTone || !height || !bodyComplexity || !bodyType || !season) {
      alert('Please fill all fields');
      return;
    }
    const combination = `clothing_${occasion}_dresses_${skinTone?.value}_${height?.value}_${bodyComplexity?.value}_${bodyType?.value}_${season?.value}`;
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
          <h2>DRESSES</h2>
        </div>
      </div>

      <div className='beardform-layout'>
        <div className='form-container'>
          <form className='form-box' onSubmit={handleSubmit}>
            
            <div className='form-group with-button'>
              <div className='select-wrapper'>
                <label className='form-label'>
                  1. Select your skin tone:
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

            <div className='form-group'>
              <div className='select-wrapper'>
                <label className='form-label'>
                  2. Select your height:
                </label>
                <Select
                  options={heightOptions}
                  value={height}
                  onChange={setHeight}
                  placeholder='Choose height...'
                  className='select-box'
                  styles={customSelectStyles}
                />
              </div>
            </div>

            <div className='form-group with-button'>
              <div className='select-wrapper'>
                <label className='form-label'>
                  3. Select your body complexity:
                </label>
                <Select
                  options={bodyComplexityOptions}
                  value={bodyComplexity}
                  onChange={setBodyComplexity}
                  placeholder='Choose body complexity...'
                  className='select-box'
                  styles={customSelectStyles}
                />
              </div>
              <button
                type='button'
                className='inline-btn'
                onClick={() => setPreview('bodycomplex')}
              >
                i
              </button>
            </div>

            <div className='form-group with-button'>
              <div className='select-wrapper'>
                <label className='form-label'>
                  4. Select your body type:
                </label>
                <Select
                  options={bodyTypeOptions}
                  value={bodyType}
                  onChange={setBodyType}
                  placeholder='Choose body type...'
                  className='select-box'
                  styles={customSelectStyles}
                />
              </div>
              <button
                type='button'
                className='inline-btn'
                onClick={() => setPreview('bodytype')}
              >
                i
              </button>
            </div>

            <div className='form-group'>
              <div className='select-wrapper'>
                <label className='form-label'>
                  5. Select your season:
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
          {preview === 'bodycomplex' && (
            <img 
              src={bodyComplexImg} 
              alt='body complexity' 
              className='preview-img preview-img-clickable'
              onClick={() => setPreview(null)}
            />
          )}
          {preview === 'bodytype' && (
            <img 
              src={bodyTypeImg} 
              alt='body type' 
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

export default DressesForm;
