import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { AuthContext } from '../context/AuthContext';
import { uploadToCloudinary } from '../utils/cloudinary';

import Navbar from './layout/Navbar';
import ProfilePopup from './layout/ProfilePopup';
import InfoButton from './layout/InfoButton';
import Footer from './layout/Footer';

import bgVideo from '../assets/login-bg1.mp4';

const BusinessPage = () => {
  const { creatorId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const isOwnProfile = user?.uid === creatorId;
  
  const [creatorData, setCreatorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploads, setUploads] = useState([]);
  const [visibleUploads, setVisibleUploads] = useState(25);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const fileInputRef = useRef(null);
  const observerTarget = useRef(null);

  useEffect(() => {
    const fetchCreatorAndUploads = async () => {
      try {
        const creatorDoc = await getDoc(doc(db, 'users', creatorId));
        if (creatorDoc.exists()) {
          const data = creatorDoc.data();
          if (data.accountType === 'business') {
            setCreatorData(data);
            
            const q = query(
              collection(db, 'uploads'),
              where('creatorId', '==', creatorId),
              orderBy('createdAt', 'desc')
            );
            const querySnapshot = await getDocs(q);
            const fetchedUploads = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            setUploads(fetchedUploads);
          }
        }
      } catch (error) {
        console.error("Error fetching business profile:", error);
      } finally {
        setLoading(false);
      }
    };
    if (creatorId) fetchCreatorAndUploads();
  }, [creatorId]);

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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploadingImage(true);
    try {
      const imageUrl = await uploadToCloudinary(file);
      await updateDoc(doc(db, 'users', user.uid), {
        'businessProfile.displayImage': imageUrl
      });
      setCreatorData(prev => ({
        ...prev,
        businessProfile: { ...prev.businessProfile, displayImage: imageUrl }
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading) return <div style={{padding: '100px', textAlign: 'center'}}>Loading...</div>;
  
  if (!creatorData) {
    return (
      <div style={{padding: '100px', textAlign: 'center'}}>
        <h2>Creator not found</h2>
        <button onClick={() => navigate(-1)} style={{padding: '10px 20px', marginTop: '20px', cursor: 'pointer'}}>Go Back</button>
      </div>
    );
  }

  const { businessProfile } = creatorData;
  const initial = businessProfile.profileName.charAt(0).toUpperCase();

  return (
    <div className="business-page">
      <div className="business-header">
        <video autoPlay loop muted playsInline src={bgVideo} />
        <Navbar />
        <ProfilePopup />
        <InfoButton onClick={() => {}} />
        <h2 className="business-heading">BUSINESS PROFILE</h2>
      </div>

      <div className="business-profile-section">
        <div className="business-avatar-wrapper">
          <div className="business-avatar">
            {businessProfile.displayImage ? (
              <img src={businessProfile.displayImage} alt="Profile" />
            ) : (
              <span className="business-avatar-initials">{initial}</span>
            )}
          </div>
          {isOwnProfile && (
            <>
              <button className="edit-avatar-btn" onClick={() => fileInputRef.current.click()}>Edit</button>
              <input type="file" ref={fileInputRef} style={{display: 'none'}} accept="image/*" onChange={handleImageUpload} />
              {uploadingImage && <span className="avatar-uploading">Uploading...</span>}
            </>
          )}
        </div>
        <div className="business-info">
          <h2 className="business-profile-name">{businessProfile.profileName}</h2>
          <p className="business-type-label">{businessProfile.businessType}</p>
          {businessProfile.website && (
            <a href={businessProfile.website.startsWith('http') ? businessProfile.website : `https://${businessProfile.website}`} target="_blank" rel="noopener noreferrer" className="business-website">
              {businessProfile.website}
            </a>
          )}
        </div>
      </div>

      <div className="uploads-section">
        <div className="uploads-header">
          <h2 className="uploads-title">
            {isOwnProfile ? 'Your Uploads' : `${businessProfile.profileName}'s Uploads`}
          </h2>
          {isOwnProfile && (
            <button className="add-new-btn" onClick={() => navigate('/new-upload')}>
              + Add New
            </button>
          )}
        </div>
        
        {uploads.length === 0 ? (
          <div className="no-uploads">
            <p>{isOwnProfile ? 'No uploads yet. Share your first look!' : 'No uploads yet.'}</p>
            {isOwnProfile && <button onClick={() => navigate('/new-upload')}>+ Add New</button>}
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
                  {isOwnProfile && (
                    <button
                      className="analytics-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/analytics/${upload.id}`);
                      }}
                    >
                      Analytics
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div ref={observerTarget} style={{height: '20px', width: '100%'}}></div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BusinessPage;
