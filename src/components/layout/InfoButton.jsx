import React from 'react';

const InfoButton = ({ onClick }) => {
  return (
    <div className='info-scroll-container'>
      <button className='info-button' onClick={onClick}>
        <i>i</i>
      </button>
      <span className='info-text'></span>
    </div>
  );
};

export default InfoButton;
