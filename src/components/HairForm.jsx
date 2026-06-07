import React, { useState, useRef } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { hairTypes, hairfallTypes, lengthOptions } from "../data/formOptions";
import party from "../assets/party.mp4";
import defaultImg from "../assets/Hair.jpeg";
import HairPreview from './Hair-info-hairType.jsx';
import HairfallPreview from './Hair-info-hairFallType.jsx';
import Footer from './layout/Footer';
import Navbar from './layout/Navbar';
import ProfilePopup from './layout/ProfilePopup';
import InfoButton from './layout/InfoButton';
import "../index.css";

const HairForm = () => {
  const navigate = useNavigate();

  const footerRef = useRef(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // State for form
  const [hairType, setHairType] = useState(null);
  const [hairfallPatch, setHairfallType] = useState(null);
  const [lengthOfHair, setLength] = useState(null);

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
    if (!hairType || !lengthOfHair || !hairfallPatch) {
      alert("Please select all fields!");
      return;
    }
    // ✅ Maintain order: hairType_length_hairfall
    const combination = `${hairType.value}_${lengthOfHair.value}_${hairfallPatch.value}`;
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
          <h2>HAIR DIMENSION</h2>
        </div>
      </div>

      <div className="beardform-layout">
        {/* LEFT FORM */}
        <div className="form-container">
          <form className="form-box" onSubmit={handleSubmit}>
            {/* Hair Type */}
            <div className="form-group with-button">
              <div className="select-wrapper">
                <label className="form-label">1. Select your hair type:</label>
                <Select
                  options={hairTypes}
                  value={hairType}
                  onChange={setHairType}
                  placeholder="Choose hair type..."
                  className="select-box"
                  styles={customSelectStyles}
                />
              </div>
              <button type="button" className="inline-btn" onClick={() => setPreview("hair")}>
                i
              </button>
            </div>

            {/* Hairfall Patch */}
            <div className="form-group with-button">
              <div className="select-wrapper">
                <label className="form-label">2. Select your hairfall type:</label>
                <Select
                  options={hairfallTypes}
                  value={hairfallPatch}
                  onChange={setHairfallType}
                  placeholder="Choose hairfall type..."
                  className="select-box"
                  styles={customSelectStyles}
                />
              </div>
              <button type="button" className="inline-btn" onClick={() => setPreview("fall")}>
                i
              </button>
            </div>

            {/* Hair Length */}
            <div className="form-group with-button">
              <div className="select-wrapper">
                <label className="form-label">3. Select length of your hair:</label>
                <Select
                  options={lengthOptions}
                  value={lengthOfHair}
                  onChange={setLength}
                  placeholder="Choose length..."
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
          {preview === "hair" && <HairPreview />}
          {preview === "fall" && <HairfallPreview />}
          {!preview && (
            <img src={defaultImg} alt="default" className="preview-img" />
          )}
        </div>
      </div>

      <Footer ref={footerRef} />
    </div>
  );
};

export default HairForm;

