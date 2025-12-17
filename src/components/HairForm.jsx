import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import party from "../assets/party.mp4";
import defaultImg from "../assets/Hair.jpeg";

import "../index.css";

const HairForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State for form
  const [hairType, setHairType] = useState(null);
  const [hairfallPatch, setHairfallType] = useState(null);
  const [lengthOfHair, setLength] = useState(null);

  // State for navbar visibility
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
  const hairTypes = [
    { value: "curly", label: "Curly" },
    { value: "wavy", label: "Wavy" },
    { value: "straight", label: "Straight" },
    { value: "coily", label: "Coily" },
    { value: "shaven", label: "Shaven" },
  ];

  const hairfallTypes = [
    { value: "none", label: "None" },
    { value: "type_1", label: "Type 1" },
    { value: "type_2", label: "Type 2" },
    { value: "type_3", label: "Type 3" },
    { value: "type_4", label: "Type 4" },
  ];

  const lengthOptions = [
    { value: "short", label: "Short" },
    { value: "mid", label: "Medium" },
    { value: "long", label: "Long" },
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
    if (!hairType || !lengthOfHair || !hairfallPatch) {
      alert("Please select all fields!");
      return;
    }
    // ✅ Maintain order: hairType_length_hairfall
    const combination = `${hairType.value}_${lengthOfHair.value}_${hairfallPatch.value}`;
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
              <Link to="hair" className="inline-btn">
                i
              </Link>
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
              <Link to="fall" className="inline-btn">
                i
              </Link>
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
          {location.pathname.includes("hair") ||
          location.pathname.includes("hairfall") ? (
            <Outlet />
          ) : (
            <img src={defaultImg} alt="default" className="preview-img" />
          )}
        </div>
      </div>
    </>
  );
};

export default HairForm;

