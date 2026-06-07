import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

import Navbar from './layout/Navbar';
import ProfilePopup from './layout/ProfilePopup';
import InfoButton from './layout/InfoButton';
import Footer from './layout/Footer';
import groomingVideo from '../assets/grooming.mp4';

const ProductAnalytics = () => {
  const { uploadId } = useParams();
  const [upload, setUpload] = useState(null);
  const [loading, setLoading] = useState(true);
  const footerRef = useRef(null);

  useEffect(() => {
    const fetchUpload = async () => {
      try {
        const docRef = doc(db, 'uploads', uploadId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setUpload(docSnap.data());
        }
      } catch (error) {
        console.error('Error fetching upload for analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpload();
  }, [uploadId]);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="analytics-page">
        <div className="analytics-header">
          <video autoPlay loop muted playsInline src={groomingVideo} />
          <Navbar />
          <ProfilePopup />
          <InfoButton onClick={scrollToFooter} />
          <h2 className="analytics-heading">ANALYTICS</h2>
        </div>
        <div className="analytics-loading">Loading analytics...</div>
        <Footer ref={footerRef} />
      </div>
    );
  }

  if (!upload) {
    return (
      <div className="analytics-page">
        <div className="analytics-header">
          <video autoPlay loop muted playsInline src={groomingVideo} />
          <Navbar />
          <ProfilePopup />
          <InfoButton onClick={scrollToFooter} />
          <h2 className="analytics-heading">ANALYTICS</h2>
        </div>
        <div className="analytics-not-found">
          <h2>Upload not found</h2>
          <button onClick={() => window.close()} className="add-new-btn">Close</button>
        </div>
        <Footer ref={footerRef} />
      </div>
    );
  }

  const views = upload?.analytics?.views || 0;
  const likes = upload?.analytics?.likes || 0;
  const productClicks = upload?.analytics?.productClicks || {};

  // Sort product clicks by count descending
  const sortedClicks = Object.entries(productClicks)
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <video autoPlay loop muted playsInline src={groomingVideo} />
        <Navbar />
        <ProfilePopup />
        <InfoButton onClick={scrollToFooter} />
        <h2 className="analytics-heading">ANALYTICS</h2>
      </div>

      <div className="analytics-layout">
        {/* LEFT — upload preview */}
        <div className="analytics-left">
          <img 
            src={upload.mainImage} 
            alt={upload.title}
            className="analytics-preview-img" 
          />
          <h2 className="analytics-upload-title">
            {upload.title}
          </h2>
        </div>

        {/* RIGHT — stats */}
        <div className="analytics-right">
          {/* Stats cards row */}
          <div className="stats-row">
            <div className="stat-card">
              <span className="stat-number">{views}</span>
              <span className="stat-label">Views</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{likes}</span>
              <span className="stat-label">Likes</span>
            </div>
          </div>

          {/* Product clicks breakdown */}
          {sortedClicks.length > 0 && (
            <div className="clicks-section">
              <h3 className="clicks-heading">
                Product Clicks
              </h3>
              <div className="clicks-list">
                {sortedClicks.map(([key, count], index) => {
                  const itemIndex = parseInt(
                    key.replace('item_', '')
                  );
                  const product = upload.products?.[itemIndex] 
                    || upload.relatedProducts?.[itemIndex];
                  return (
                    <div key={key} className="click-item">
                      <div className="click-item-left">
                        {product?.imageUrl && (
                          <img 
                            src={product.imageUrl}
                            alt="product"
                            className="click-thumb"
                          />
                        )}
                        <span className="click-label">
                          Product {itemIndex + 1}
                        </span>
                      </div>
                      <div className="click-bar-wrapper">
                        <div 
                          className="click-bar"
                          style={{
                            width: `${Math.min(
                              (count / (sortedClicks[0][1] || 1)) 
                              * 100, 100
                            )}%`
                          }}
                        />
                      </div>
                      <span className="click-count">
                        {count} clicks
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {sortedClicks.length === 0 && (
            <div className="no-clicks">
              <p>No product clicks yet.</p>
              <p>Share your upload to start 
                 tracking engagement.</p>
            </div>
          )}
        </div>
      </div>

      <Footer ref={footerRef} />
    </div>
  );
};

export default ProductAnalytics;
