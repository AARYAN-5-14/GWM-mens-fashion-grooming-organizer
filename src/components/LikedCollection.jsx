import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { AuthContext } from '../context/AuthContext';
import { products } from '../data/products';

import Navbar from './layout/Navbar';
import ProfilePopup from './layout/ProfilePopup';
import InfoButton from './layout/InfoButton';
import Footer from './layout/Footer';

import bgVideo from '../assets/login-bg1.mp4';
import ProductCard from './ProductCard'; 

const LikedCollection = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [likedProducts, setLikedProducts] = useState([]);
  const [visibleItems, setVisibleItems] = useState(25);
  const [firestoreUploads, setFirestoreUploads] = useState([]);
  const observerTarget = useRef(null);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, 'uploads')
        );
        const uploads = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          imageUrl: doc.data().mainImage,
          name: doc.data().title,
          price: null,
          affiliateLink: null,
        }));
        setFirestoreUploads(uploads);
      } catch (error) {
        console.error('Error fetching uploads:', error);
      }
    };
    fetchUploads();
  }, []);

  useEffect(() => {
    if (user?.uid) {
      const fetchLiked = async () => {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const likedIds = userDoc.data().likedProducts || [];
            
            const allAvailableProducts = [
              ...products, 
              ...firestoreUploads
            ];
            
            const likedProductObjects = likedIds
              .map(id => allAvailableProducts.find(
                p => p.id === id
              ))
              .filter(Boolean);
              
            setLikedProducts(likedProductObjects);
          }
        } catch (error) {
          console.error("Error fetching liked products:", error);
        }
      };
      
      // fetchLiked will naturally re-run and recalculate
      // when firestoreUploads finishes loading its state.
      fetchLiked();
    }
  }, [user, firestoreUploads]);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setVisibleItems(prev => prev + 25);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1.0 });
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current);
    };
  }, [handleObserver]);

  return (
    <div className="liked-page">
      <div className="liked-header">
        <video autoPlay loop muted playsInline src={bgVideo} />
        <Navbar />
        <ProfilePopup />
        <InfoButton onClick={() => {}} />
        <h2 className="liked-heading">LIKED COLLECTION</h2>
      </div>

      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '20px 40px'}}>
        <button className="back-btn" onClick={() => navigate('/profile')} style={{background: 'none', border: 'none', fontFamily: 'Boska-Medium', fontSize: '15px', color: '#433b35', cursor: 'pointer', padding: 0}}>
          ← Back to Profile
        </button>
      </div>

      {likedProducts.length === 0 ? (
        <div className="no-liked">
          <p>No liked products yet.</p>
          <button onClick={() => navigate('/explore')}>Explore Products</button>
        </div>
      ) : (
        <>
          <p className="liked-count">{likedProducts.length} liked products</p>
          <div className="liked-grid">
            {likedProducts.slice(0, visibleItems).map(p => (
              <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} style={{cursor: 'pointer'}}>
                <ProductCard
                  image={p.imageUrl}
                  name={p.name}
                  price={p.price}
                  affiliateLink={p.affiliateLink}
                  category={p.category || p.type}
                />
              </div>
            ))}
          </div>
          <div ref={observerTarget} style={{height: '20px', width: '100%'}}></div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default LikedCollection;
