import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ className = 'navbar-bread-form', variant }) => {
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  const navClass = variant ? variant : className;

  return (
    <div
      className={`${navClass} ${showNavbar ? "visible" : "hidden"}`}
      onClick={() => navigate("/")}
    >
      <h1>GWM</h1>
    </div>
  );
};

export default Navbar;
