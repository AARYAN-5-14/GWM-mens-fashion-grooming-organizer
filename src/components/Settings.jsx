import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { AuthContext } from '../context/AuthContext';

import Navbar from './layout/Navbar';
import ProfilePopup from './layout/ProfilePopup';
import InfoButton from './layout/InfoButton';
import Footer from './layout/Footer';

import bgVideo from '../assets/grooming.mp4';

const sidebarItems = [
  { id: 'profile', label: 'Profile', icon: '◎' },
  { id: 'business-profile', label: 'Business Profile', icon: '🏢' },
  { id: 'account-management', label: 'Account Management', icon: '⚙' },
  { id: 'about', label: 'About', icon: 'ℹ' },
  { id: 'login', label: 'Login', icon: '→', action: 'login' },
  { id: 'logout', label: 'Logout', icon: '⇐', action: 'logout' },
];

const Settings = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  
  const [activeSection, setActiveSection] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const [accountType, setAccountType] = useState('user');
  const [showConvertForm, setShowConvertForm] = useState(false);
  const [formData, setFormData] = useState({ profileName: '', website: '', businessType: '' });
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (user?.uid) {
      const fetchUserData = async () => {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.accountType) setAccountType(data.accountType);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [user]);

  const handleSidebarClick = (item) => {
    if (item.action === 'login') {
      navigate('/login');
    } else if (item.action === 'logout') {
      logout();
    } else if (item.id === 'business-profile') {
      navigate(`/business/${user.uid}`);
    } else {
      setActiveSection(item.id);
    }
  };

  const handleConvertSubmit = async (e) => {
    e.preventDefault();
    if (!formData.profileName || !formData.businessType) return;
    
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        accountType: 'business',
        businessProfile: {
          profileName: formData.profileName,
          website: formData.website || '',
          businessType: formData.businessType,
          displayImage: '',
          createdAt: serverTimestamp()
        }
      });
      setSuccessMsg("Business account created! Redirecting to your Business Profile...");
      setTimeout(() => {
        navigate('/business');
      }, 2000);
    } catch (error) {
      console.error("Error converting account:", error);
    }
  };

  const renderContent = () => {
    if (!activeSection) {
      return <div className="settings-empty">Select an option from the sidebar</div>;
    }

    if (activeSection === 'account-management') {
      return (
        <div>
          <h2 className="settings-section-heading">Account Management</h2>
          {accountType === 'business' ? (
            <div>
              <p>You already have a Business Account.</p>
              <button className="convert-btn" onClick={() => navigate('/business')} style={{marginTop: '15px'}}>
                Go to Business Profile →
              </button>
            </div>
          ) : !showConvertForm ? (
            <div>
              <h3 style={{fontFamily: 'Boska-Bold', fontSize: '20px', marginBottom: '15px'}}>Convert to Business Account</h3>
              <p className="account-management-info">
                Unlock the ability to upload grooming and clothing looks, build your creator profile, track analytics, and grow your audience on GWM. Converting is free and takes less than a minute.
              </p>
              <button className="convert-btn" onClick={() => setShowConvertForm(true)}>
                Convert Account
              </button>
            </div>
          ) : (
            <div className="convert-form">
              <h3 style={{fontFamily: 'Boska-Bold', fontSize: '20px', marginBottom: '20px'}}>Create Business Account</h3>
              {successMsg && <p style={{color: 'green', marginBottom: '15px', fontFamily: 'Supreme-Regular'}}>{successMsg}</p>}
              <form onSubmit={handleConvertSubmit}>
                <div className="convert-form-group">
                  <label className="convert-form-label">Add your Profile Name *</label>
                  <input type="text" className="convert-form-input" required value={formData.profileName} onChange={(e) => setFormData({...formData, profileName: e.target.value})} />
                </div>
                <div className="convert-form-group">
                  <label className="convert-form-label">Have you got a Website? (optional)</label>
                  <input type="text" className="convert-form-input" value={formData.website} onChange={(e) => setFormData({...formData, website: e.target.value})} />
                </div>
                <div className="convert-form-group">
                  <label className="convert-form-label">Describe your Business: *</label>
                  <div className="radio-group">
                    {['Blogger', 'Consumer Goods / Product & Service', 'Contractor / Service Provider', 'Creator, Influencer & Public Figure', 'Local Shop / Retailer', 'Online Retailer', 'Publisher / Media', 'Others'].map(type => (
                      <label key={type} className="radio-option">
                        <input type="radio" name="businessType" value={type} required checked={formData.businessType === type} onChange={(e) => setFormData({...formData, businessType: e.target.value})} />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>
                <button type="submit" className="convert-btn">Create Business Account</button>
              </form>
            </div>
          )}
        </div>
      );
    }
    
    if (activeSection === 'profile') {
      return <div><h2 className="settings-section-heading">Profile</h2><p>Profile settings content goes here.</p></div>;
    }
    if (activeSection === 'about') {
      return <div><h2 className="settings-section-heading">About</h2><p>About information goes here.</p></div>;
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <video autoPlay loop muted playsInline src={bgVideo} />
        <Navbar />
        <ProfilePopup />
        <InfoButton onClick={() => {}} />
        <h2 className="settings-heading">SETTINGS</h2>
      </div>

      <div className="settings-layout">
        <div className={`settings-sidebar ${isMobile && activeSection ? 'sidebar-hidden-mobile' : ''}`}>
          {sidebarItems.map(item => {
            if (item.id === 'logout' && !user) return null;
            if (item.id === 'login' && user) return null;
            if (item.id === 'business-profile' && accountType !== 'business') return null;
            return (
              <React.Fragment key={item.id}>
                {(item.id === 'login' || item.id === 'logout') && <div className="settings-sidebar-divider" />}
                <div 
                  className={`settings-sidebar-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleSidebarClick(item)}
                >
                  <span style={{fontSize: '18px'}}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
        
        <div className={`settings-display ${isMobile && !activeSection ? 'display-hidden-mobile' : ''}`}>
          {isMobile && activeSection && (
            <button className="mobile-back-btn" onClick={() => setActiveSection(null)}>
              ← back
            </button>
          )}
          {renderContent()}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Settings;
