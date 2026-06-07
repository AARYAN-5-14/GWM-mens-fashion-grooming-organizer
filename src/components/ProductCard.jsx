import React from 'react';

const ProductCard = ({ image, name, price, affiliateLink, category, minimal = false }) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-img" />
      {!minimal && (
        <>
          <p className="product-name">{name}</p>
          {price && (
            <p className="product-price">₹{price}</p>
          )}
          {affiliateLink && (
            <a href={affiliateLink}
               target="_blank"
               rel="noopener noreferrer"
               className="product-btn">
              Shop Now
            </a>
          )}
        </>
      )}
    </div>
  );
};

export default ProductCard;
