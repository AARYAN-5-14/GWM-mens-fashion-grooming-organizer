import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import ProfilePopup from './layout/ProfilePopup';
import InfoButton from './layout/InfoButton';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import { AuthContext } from '../context/AuthContext';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import loginBg from '../assets/login-bg1.mp4';

const Explore = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('all');
  const [activeOccasion, setActiveOccasion] = useState('all');
  const [activeTime, setActiveTime] = useState('all');
  const [visibleCount, setVisibleCount] = useState(25);
  const [likedProducts, setLikedProducts] = useState([]);
  
  const [firestoreUploads, setFirestoreUploads] = useState([]);
  const [uploadsLoading, setUploadsLoading] = useState(true);

  const sentinelRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    const loadLikes = async () => {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setLikedProducts(userDoc.data().likedProducts || []);
      }
    };
    loadLikes();
  }, [isAuthenticated, user]);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, 'uploads')
        );
        const uploads = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Normalize fields to match products.js schema
          imageUrl: doc.data().mainImage,
          name: doc.data().title,
          price: null,
          affiliateLink: null,
          description: doc.data().description || '',
          tags: doc.data().resultKeys || [],
          type: doc.data().type || 'grooming',
          occasion: doc.data().occasions || [],
          timeOfDay: doc.data().timeOfDay || [],
          isFirestoreUpload: true // flag to distinguish
        }));
        setFirestoreUploads(uploads);
      } catch (error) {
        console.error('Error fetching uploads:', error);
      } finally {
        setUploadsLoading(false);
      }
    };
    fetchUploads();
  }, []);

  const handleLike = async (e, productId) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    const userRef = doc(db, 'users', user.uid);
    const isLiked = likedProducts.includes(productId);
    const updatedLikes = isLiked
      ? likedProducts.filter(id => id !== productId)
      : [...likedProducts, productId];
    
    setLikedProducts(updatedLikes);
    
    try {
      await updateDoc(userRef, { likedProducts: updatedLikes });
    } catch (error) {
      console.error('Error updating likes:', error);
      setLikedProducts(likedProducts);
    }
  };

  // Merge static products + Firestore uploads
  const allProducts = [...products, ...firestoreUploads];

  const filteredProducts = allProducts.filter(p => {
    const matchesType = activeType === 'all' || 
      p.type === activeType;
    const matchesOccasion = activeOccasion === 'all' || 
      (p.occasion && p.occasion.includes(activeOccasion));
    const matchesTime = activeTime === 'all' || 
      (Array.isArray(p.timeOfDay) 
        ? p.timeOfDay.includes(activeTime)
        : p.timeOfDay === activeTime);
    const matchesSearch = searchQuery === '' ||
      p.name.toLowerCase().includes(
        searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase()
        .includes(searchQuery.toLowerCase())) ||
      (p.tags && p.tags.some(tag => 
        tag.toLowerCase().includes(
          searchQuery.toLowerCase())));
    
    return matchesType && matchesOccasion && 
           matchesTime && matchesSearch;
  });

  useEffect(() => {
    setVisibleCount(25);
  }, [activeType, activeOccasion, activeTime, searchQuery]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  useEffect(() => {
    if (visibleCount >= filteredProducts.length) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount((prev) => prev + 25);
      }
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) observer.unobserve(sentinelRef.current);
    };
  }, [visibleCount, filteredProducts.length]);

  return (
    <div className="explore-container">
      <div className="explore-header">
        <Navbar />
        <ProfilePopup />
        <InfoButton />
        <div className="background-video-explore">
          <video src={loginBg} autoPlay loop muted playsInline />
          <h2 className="explore-heading">EXPLORE</h2>
        </div>
      </div>

      <div className="explore-search-wrapper">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="explore-search-input"
        />
      </div>

      <div className="filter-section">
        <div className="filter-row">
          {['all', 'grooming', 'hair', 'clothing', 'accessories'].map(type => (
            <button
              key={type}
              className={`filter-chip ${activeType === type ? 'active' : ''}`}
              onClick={() => {
                setActiveType(type);
                if (type === 'all') setActiveOccasion('all');
              }}
            >
              {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {activeType !== 'all' && (
          <div className="filter-row">
            {['all', 'party', 'formal', 'date', 'family'].map(occ => (
              <button
                key={occ}
                className={`filter-chip ${activeOccasion === occ ? 'active' : ''}`}
                onClick={() => setActiveOccasion(occ)}
              >
                {occ === 'all' ? 'All Occasions' : occ.charAt(0).toUpperCase() + occ.slice(1)}
              </button>
            ))}
          </div>
        )}

        <div className="filter-row">
          {['all', 'day', 'night'].map(time => (
            <button
              key={time}
              className={`filter-chip ${activeTime === time ? 'active' : ''}`}
              onClick={() => setActiveTime(time)}
            >
              {time === 'all' ? 'All Times' : time.charAt(0).toUpperCase() + time.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {uploadsLoading && (
        <p className="loading-more">Loading products...</p>
      )}

      {filteredProducts.length === 0 ? (
        <div className="explore-empty">
          <p>No products found. Try a different search or filter.</p>
        </div>
      ) : (
        <div className="explore-grid">
          {visibleProducts.map(p => (
            <div 
              key={p.id}
              className="explore-card-wrapper"
              onClick={() => navigate(`/product/${p.id}`)}
            >
              <ProductCard
                image={p.imageUrl}
                name={p.name}
                price={p.price}
                affiliateLink={p.affiliateLink}
                category={p.category || p.type}
                minimal={true}
              />
              <button
                className={`like-btn ${likedProducts.includes(p.id) ? 'liked' : ''}`}
                onClick={(e) => handleLike(e, p.id)}
              >
                ♥
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="shop-count">
        Showing {visibleProducts.length} of {filteredProducts.length} products
      </p>
      {visibleCount < filteredProducts.length && (
        <div className="loading-more">Loading more...</div>
      )}
      <div ref={sentinelRef} className="scroll-sentinel" />

      <Footer ref={footerRef} />
    </div>
  );
};

export default Explore;
