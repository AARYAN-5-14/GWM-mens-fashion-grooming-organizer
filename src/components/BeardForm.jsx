import React, { useState, useEffect, useCallback, useRef, useContext } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { faceShapes, beardTypes, volumeOptions } from "../data/formOptions";
import { AuthContext } from '../context/AuthContext';
import party from "../assets/party.mp4";
import defaultImg from "../assets/Beard.jpeg";
import userIcon from '../assets/user-icon.png';
import FacePreview from './Beard-info-faceShape.jsx';
import BeardPreview from './Beard-info-BreadType.jsx';

import Footer from './layout/Footer';
import Navbar from './layout/Navbar';
import ProfilePopup from './layout/ProfilePopup';
import InfoButton from './layout/InfoButton';

import "../index.css";

const BeardForm = () => {
  const navigate = useNavigate();
  const footerRef = useRef(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // State for form
  const [faceShape, setFaceShape] = useState(null);
  const [beardType, setBeardType] = useState(null);
  const [volumeOfBeard, setVolume] = useState(null);

  // State for preview
  const [preview, setPreview] = useState(null);

  // Options
  

  

  

  const customSelectStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      border: "none",
      boxShadow: "none",
      backgroundColor: "transparent",
      "&:hover": {
        border: "none",
      },
    }),
    dropdownIndicator: (baseStyles) => ({
      ...baseStyles,
      color: "#333",
      "&:hover": { color: "#000" },
    }),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!faceShape || !beardType || !volumeOfBeard) {
      alert("Please select all fields!");
      return;
    }
    const combination = `${faceShape.value}_${beardType.value}_${volumeOfBeard.value}`;
    navigate(`/results/${combination}`);
  };

  return (
    <div className='main'>
      <InfoButton onClick={scrollToFooter} />

      <ProfilePopup />

      {/* Navbar + Video + Heading */}
      <div className="heading">
        <Navbar className="navbar-bread-form" />
        <div className="background-video">
          <video src={party} autoPlay loop muted playsInline />
          <h2>BEARD DIMENSION</h2>
        </div>
      </div>

      <div className="beardform-layout">
        {/* LEFT FORM */}
        <div className="form-container">
          <form className="form-box" onSubmit={handleSubmit}>
            {/* Face Shape */}
            <div className="form-group with-button">
              <div className="select-wrapper">
                <label className="form-label">1. Select your face shape:</label>
                <Select
                  options={faceShapes}
                  value={faceShape}
                  onChange={setFaceShape}
                  placeholder="Choose face shape..."
                  className="select-box"
                  styles={customSelectStyles}
                />
              </div>
              <button type="button" className="inline-btn" onClick={() => setPreview("face")}>
                i
              </button>
            </div>

            {/* Beard Type */}
            <div className="form-group with-button">
              <div className="select-wrapper">
                <label className="form-label">2. Select your beard type:</label>
                <Select
                  options={beardTypes}
                  value={beardType}
                  onChange={setBeardType}
                  placeholder="Choose beard type..."
                  className="select-box"
                  styles={customSelectStyles}
                />
              </div>
              <button type="button" className="inline-btn" onClick={() => setPreview("beard")}>
                i
              </button>
            </div>

            {/* Volume */}
            <div className="form-group with-button">
              <div className="select-wrapper">
                <label className="form-label">3. Select volume of your beard:</label>
                <Select
                  options={volumeOptions}
                  value={volumeOfBeard}
                  onChange={setVolume}
                  placeholder="Choose volume..."
                  className="select-box"
                  styles={customSelectStyles}
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              See Results
            </button>
          </form>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="preview-container">
          {preview === "face" && <FacePreview />}
          {preview === "beard" && <BeardPreview />}
          {!preview && (
            <img src={defaultImg} alt="default" className="preview-img" />
          )}
        </div>
      </div>

      <Footer ref={footerRef} />
    </div>
  );
};

export default BeardForm;



