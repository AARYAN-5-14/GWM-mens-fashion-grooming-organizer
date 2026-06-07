import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { AuthContext } from '../context/AuthContext';

import Navbar from './layout/Navbar';
import ProfilePopup from './layout/ProfilePopup';
import InfoButton from './layout/InfoButton';
import Footer from './layout/Footer';

import bgVideo from '../assets/login-bg1.mp4';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  
  const [uploads, setUploads] = useState([]);
  const [visibleUploads, setVisibleUploads] = useState(25);
  
  const observerTarget = useRef(null);

  useEffect(() => {
    if (user?.uid) {
      const fetchUserData = async () => {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [user]);

  useEffect(() => {
    if (userData?.accountType === 'business' && user?.uid) {
      const fetchUploads = async () => {
        try {
          const q = query(
            collection(db, 'uploads'),
            where('creatorId', '==', user.uid),
            orderBy('createdAt', 'desc')
          );
          const querySnapshot = await getDocs(q);
          const fetchedUploads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setUploads(fetchedUploads);
        } catch (error) {
          console.error("Error fetching uploads:", error);
        }
      };
      fetchUploads();
    }
  }, [userData, user]);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setVisibleUploads(prev => prev + 25);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1.0 });
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current);
    };
  }, [handleObserver]);

  if (!userData) return null;

  const displayName = userData.accountType === 'business' && userData.businessProfile?.profileName 
    ? userData.businessProfile.profileName 
    : userData.displayName || 'User';

  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="profile-page">
      <div className="profile-header">
        <video autoPlay loop muted playsInline src={bgVideo} />
        <Navbar />
        <ProfilePopup />
        <InfoButton onClick={() => {}} />
        <h2 className="profile-heading">PROFILE</h2>
      </div>

      <div className="profile-section">
        <div className="profile-avatar">
          {userData.accountType === 'business' && userData.businessProfile?.displayImage ? (
            <img src={userData.businessProfile.displayImage} alt="Profile" />
          ) : (
            <span className="profile-avatar-initials">{initial}</span>
          )}
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{displayName}</h2>
          <p className="profile-email">{userData.email}</p>
        </div>
      </div>

      <div className="collections-section">
        <h3 className="collections-title">Collections</h3>
        <div className="collection-btn" onClick={() => navigate('/profile/liked')}>
          <span className="collection-icon">❤</span>
          <span className="collection-label">Liked Collection</span>
          <span className="collection-arrow">→</span>
        </div>
      </div>

      {userData.accountType === 'business' && (
        <div className="uploads-section">
          <div className="uploads-header">
            <h2 className="uploads-title">Your Uploads</h2>
            <button className="add-new-btn" onClick={() => navigate('/new-upload')}>
              + Add New
            </button>
          </div>
          
          {uploads.length === 0 ? (
            <div className="no-uploads">
              <p>No uploads yet.</p>
              <button onClick={() => navigate('/new-upload')}>Create your first upload</button>
            </div>
          ) : (
            <>
              <div className="uploads-grid">
                {uploads.slice(0, visibleUploads).map(upload => (
                  <div
                    key={upload.id}
                    className="upload-card-wrapper"
                    onClick={() => window.open(
                      `/product/${upload.id}`, '_blank'
                    )}
                  >
                    <div className="upload-card">
                      <img src={upload.mainImage} alt="Upload" />
                    </div>
                    <button
                      className="analytics-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/analytics/${upload.id}`);
                      }}
                    >
                      Analytics
                    </button>
                  </div>
                ))}
              </div>
              <div ref={observerTarget} style={{height: '20px', width: '100%'}}></div>
            </>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Profile;