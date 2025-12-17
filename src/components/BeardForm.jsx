import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import party from "../assets/party.mp4";
import defaultImg from "../assets/Beard.jpeg";

import "../index.css";

const BeardForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State for form
  const [faceShape, setFaceShape] = useState(null);
  const [beardType, setBeardType] = useState(null);
  const [volumeOfBeard, setVolume] = useState(null);

  // 👇 State for navbar visibility
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // ✅ Scroll listener wrapped in useCallback
  const controlNavbar = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false); // scrolling down → hide
    } else {
      setShowNavbar(true); // scrolling up → show
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [controlNavbar]);

  // Options
  const faceShapes = [
    { value: "round", label: "Round" },
    { value: "long", label: "Long" },
    { value: "oval", label: "Oval" },
    { value: "square", label: "Square" },
    { value: "heart", label: "Heart" },
    { value: "diamond", label: "Diamond" },
    { value: "triangle", label: "Triangle" },
  ];

  const beardTypes = [
    { value: "uneven_patch", label: "Uneven Patch" },
    { value: "light_cheeks", label: "Light on Cheeks" },
    { value: "chin_only", label: "On Chin Only" },
    { value: "light_connection", label: "Light Connection (Beard ↔ Mustache)" },
  ];

  const volumeOptions = [
    { value: "light", label: "Light" },
    { value: "medium", label: "Medium" },
    { value: "dense", label: "Dense" },
  ];

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
    <>
      {/* Navbar + Video + Heading */}
      <div className="heading">
        <div
          className={`navbar-bread-form ${showNavbar ? "visible" : "hidden"}`}
          onClick={() => navigate("/")}
        >
          <h1>GWM</h1>
        </div>
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
              <Link to="face" className="inline-btn">
                i
              </Link>
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
              <Link to="beard" className="inline-btn">
                i
              </Link>
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
          {location.pathname.includes("face") ||
          location.pathname.includes("beard") ? (
            <Outlet />
          ) : (
            <img src={defaultImg} alt="default" className="preview-img" />
          )}
        </div>
      </div>
    </>
  );
};

export default BeardForm;



