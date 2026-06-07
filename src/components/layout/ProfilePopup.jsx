import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import userIcon from '../../assets/user-icon.png';

const ProfilePopup = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useContext(AuthContext);
  const [popupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef(null);

  const togglePopup = () => setPopupOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setPopupOpen(false);
      }
    };
    if (popupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [popupOpen]);

  return (
    <div className='profile-btn-container' ref={popupRef}>
      <button className='auth-button' onClick={togglePopup}>
        <img src={userIcon} alt='profile' className='auth-icon' />
      </button>
      {popupOpen && (
        <div className='profile-popup'>
          {!isAuthenticated ? (
            // NOT logged in — show sign in option
            <div className='profile-popup-item' 
              onClick={() => { 
                setPopupOpen(false); 
                navigate('/signup'); 
              }}>
              <span className='popup-icon'>→</span>
              <span>Login / Signup</span>
            </div>
          ) : (
            // Logged in — show existing items
            <>
              <div className='profile-popup-item' 
                onClick={() => { 
                  setPopupOpen(false); 
                  navigate('/'); 
                }}>
                <span className='popup-icon'>⌂</span>
                <span>Home</span>
              </div>
              <div className='profile-popup-divider' />
              <div className='profile-popup-item' 
                onClick={() => { 
                  setPopupOpen(false); 
                  navigate('/profile'); 
                }}>
                <span className='popup-icon'>◎</span>
                <span>My Profile</span>
              </div>
              <div className='profile-popup-divider' />
              <div className='profile-popup-item' 
                onClick={() => { 
                  setPopupOpen(false); 
                  navigate('/settings'); 
                }}>
                <span className='popup-icon'>⚙</span>
                <span>Settings</span>
              </div>
              <div className='profile-popup-divider' />
              <div className='profile-popup-item logout' 
                onClick={() => { 
                  logout(); 
                  setPopupOpen(false); 
                }}>
                <span className='popup-icon'>→</span>
                <span>Logout</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePopup;
