import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import NavbarLogo from "./NavbarLogo"; 
import partyVideo from "../assets/party.mp4";
import formalVideo from "../assets/formal.mp4";
import dateVideo from "../assets/date.mp4";
import familyVideo from "../assets/family_gathering.mp4";
import "../index.css";
import InfoButton from './layout/InfoButton';
import Footer from './layout/Footer';
import ProfilePopup from './layout/ProfilePopup';
import { beardRecommendations } from "../data/recommendations";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

const Result = () => {
  const { combination } = useParams();
  const result = beardRecommendations[combination];

  const getVideoFromCombination = (combination) => {
    if (!combination) return partyVideo;
    if (combination.includes('formal')) return formalVideo;
    if (combination.includes('date')) return dateVideo;
    if (combination.includes('family')) return familyVideo;
    if (combination.includes('party')) return partyVideo;
    // Default for grooming without occasion in key
    return partyVideo;
  };

  const bgVideo = getVideoFromCombination(combination);

  const [visibleCount, setVisibleCount] = useState(25);
  const [firestoreMatches, setFirestoreMatches] = useState([]);
  const [firestoreLoading, setFirestoreLoading] = useState(true);
  const sentinelRef = useRef(null);
  const footerRef = useRef(null);

  const staticProducts = result ? result.products : [];
  const allProducts = [...staticProducts, ...firestoreMatches];

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  useEffect(() => {
    if (!combination) return;
    
    const fetchMatchingUploads = async () => {
      try {
        setFirestoreLoading(true);
        const q = query(
          collection(db, 'uploads'),
          where('resultKeys', 'array-contains', combination)
        );
        const snapshot = await getDocs(q);
        const matches = snapshot.docs.map(doc => ({
          id: doc.id,
          img: doc.data().mainImage,
          name: doc.data().title,
          link: null, // no direct link for uploads
          isFirestoreUpload: true
        }));
        setFirestoreMatches(matches);
      } catch (error) {
        console.error('Error fetching matching uploads:', error);
      } finally {
        setFirestoreLoading(false);
      }
    };
    
    fetchMatchingUploads();
  }, [combination]);

  // DEV NOTE: Pagination activates when a combination has 26+ 
  // products. Currently all combinations have ≤6 products so 
  // all items render in the first batch. Infinite scroll is 
  // ready and will activate automatically as products are added
  // to recommendations.js
  useEffect(() => {
    if (visibleCount >= allProducts.length) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount((prev) => prev + 25);
      }
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [allProducts.length, visibleCount]);

  return (
    
    <div className="result-container">
      <InfoButton onClick={scrollToFooter} />
      <ProfilePopup />
      <NavbarLogo />
      <div className="heading">
      
        <div className="background-video-result">
          <video src={bgVideo} autoPlay loop muted playsInline />
          <h2>RESULTS</h2>
        </div>
        </div>
      
      <div className="result-grid">
        {allProducts.length === 0 && !firestoreLoading ? (
          <div className="result-empty">
            <p>No looks found for this combination yet.</p>
            <p>Check back soon as creators add more content.</p>
          </div>
        ) : (
          allProducts.slice(0, visibleCount).map((item, index) => (
            item.isFirestoreUpload ? (
              // Firestore upload card — opens ProductDetail
              <div
                key={item.id}
                className="result-card"
                style={{cursor: 'pointer'}}
                onClick={() => window.open(
                  `/product/${item.id}`, '_blank'
                )}
              >
                <img src={item.img} alt={item.name} 
                     className="result-img" />
              </div>
            ) : (
              // Static recommendation card — opens link
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="result-card"
              >
                <img src={item.img} alt={item.name} 
                     className="result-img" />
              </a>
            )
          ))
        )}
      </div>

      {visibleCount < allProducts.length && (
        <div className="loading-more">Loading more...</div>
      )}
      <div ref={sentinelRef} className="scroll-sentinel" />
      
      {allProducts.length > 0 && (
        <p className="result-count">
          Showing {allProducts.slice(0, visibleCount).length} of {allProducts.length}
        </p>
      )}
      
      <Footer ref={footerRef} />
    </div>
  );
};

export default Result;
