import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const NavbarLogo = () => {
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [controlNavbar]);

  return (
    <div
      className={`navbar-bread-form ${showNavbar ? "visible" : "hidden"}`}
      onClick={() => navigate("/")}
    >
      <h1>GWM</h1>
    </div>
  );
};

export default NavbarLogo;
