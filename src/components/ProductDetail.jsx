import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/config';
import { AuthContext } from '../context/AuthContext';
import { products as staticProducts } from '../data/products';

import Navbar from './layout/Navbar';
import ProfilePopup from './layout/ProfilePopup';
import InfoButton from './layout/InfoButton';
import Footer from './layout/Footer';
import groomingVideo from '../assets/grooming.mp4';

const normalizeProduct = (data, id) => ({
  id,
  type: data.type || 'grooming',
  title: data.title || data.name,
  description: data.description || '',
  mainImage: data.mainImage || data.imageUrl,
  youtubeLink: data.youtubeLink || null,
  platforms: data.platforms || [],
  products: data.products || [],
  relatedProducts: data.relatedProducts || [],
});

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likedProductsArray, setLikedProductsArray] = useState([]);
  
  const footerRef = useRef(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // First check static products
        const staticMatch = staticProducts.find(p => p.id === id);
        if (staticMatch) {
          setProduct(normalizeProduct(staticMatch, id));
        } else {
          // Fetch from Firestore uploads
          const docRef = doc(db, 'uploads', id);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setProduct(normalizeProduct(docSnap.data(), id));
            
            // Increment view count
            const uploadRef = doc(db, 'uploads', id);
            await updateDoc(uploadRef, {
              'analytics.views': increment(1)
            });
          } else {
            setProduct(null);
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    
    const loadUserLikes = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const likes = userDoc.data().likedProducts || [];
          setLikedProductsArray(likes);
          setIsLiked(likes.includes(id));
        }
      } catch (error) {
        console.error('Error loading likes:', error);
      }
    };
    
    loadUserLikes();
  }, [isAuthenticated, user, id]);

  const handleLikeToggle = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    
    const updatedLikes = newIsLiked
      ? [...likedProductsArray, id]
      : likedProductsArray.filter(itemId => itemId !== id);
      
    setLikedProductsArray(updatedLikes);
    
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { likedProducts: updatedLikes });
    } catch (error) {
      console.error('Error updating likes:', error);
      // Revert on failure
      setIsLiked(!newIsLiked);
      setLikedProductsArray(likedProductsArray);
    }
  };

  if (loading) {
    return (
      <div className="detail-page">
        <div className="detail-header">
          <video autoPlay loop muted playsInline src={groomingVideo} />
          <Navbar />
          <ProfilePopup />
          <InfoButton onClick={scrollToFooter} />
          <h2 className="detail-heading">PRODUCT DETAILS</h2>
        </div>
        <div className="detail-loading">
          <p>Loading...</p>
        </div>
        <Footer ref={footerRef} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="detail-page">
        <div className="detail-header">
          <video autoPlay loop muted playsInline src={groomingVideo} />
          <Navbar />
          <ProfilePopup />
          <InfoButton onClick={scrollToFooter} />
          <h2 className="detail-heading">PRODUCT DETAILS</h2>
        </div>
        <div className="detail-not-found">
          <h2>Product not found</h2>
          <button onClick={() => window.close()}>
            Close
          </button>
        </div>
        <Footer ref={footerRef} />
      </div>
    );
  }

  // Determine which related products array to use based on type
  const relatedItems = product.type === 'clothing' 
    ? product.relatedProducts 
    : product.products;

  const handleProductClick = async (index) => {
    try {
      const uploadRef = doc(db, 'uploads', id);
      await updateDoc(uploadRef, {
        [`analytics.productClicks.item_${index}`]: 
          increment(1)
      });
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  return (
    <div className="detail-page">
      <div className="detail-header">
        <video autoPlay loop muted playsInline src={groomingVideo} />
        <Navbar />
        <ProfilePopup />
        <InfoButton onClick={scrollToFooter} />
        <h2 className="detail-heading">PRODUCT DETAILS</h2>
      </div>

      <div className="detail-layout">
        <div className="detail-left">
          <div className="detail-img-wrapper">
            <img 
              src={product.mainImage} 
              alt={product.title} 
              className="detail-img" 
            />
            <button 
              className={`like-btn-detail ${isLiked ? 'liked' : ''}`}
              onClick={handleLikeToggle}
            >
              {isLiked ? '❤' : '♡'}
            </button>
          </div>
        </div>

        <div className="detail-right">
          <h1 className="detail-title">{product.title}</h1>
          <p className="detail-about">{product.description}</p>
          
          {product.type === 'grooming' && product.youtubeLink && (
            <a href={product.youtubeLink} 
               target="_blank"
               rel="noopener noreferrer"
               className="youtube-btn">
              ▶ Watch on YouTube
            </a>
          )}

          {product.type === 'clothing' && product.platforms && product.platforms.length > 0 && (
            <div className="platform-buttons">
              {product.platforms.map((platform, index) => (
                <a key={index}
                   href={platform.link}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="platform-btn">
                  <span className="platform-name">
                    {platform.platform}
                  </span>
                  <span className="platform-price">
                    ₹{platform.price}
                  </span>
                </a>
              ))}
            </div>
          )}

          {relatedItems && relatedItems.length > 0 && (
            <div className="related-section">
              <h3 className="related-heading">
                {product.type === 'clothing' ? 'Related Products' : 'Tag Products'}
              </h3>
              <div className="related-scroll">
                {relatedItems.map((item, index) => (
                  <a key={index}
                     href={item.affiliateLink}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="related-thumb"
                     onClick={() => handleProductClick(index)}>
                    <img src={item.imageUrl} 
                         alt="related product" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer ref={footerRef} />
    </div>
  );
};

export default ProductDetail;
