import React from 'react';

const Images = ({ image }) => {
  return (
    <div
      className='kiosk-image absolute w-52 right-5'
      style={{ aspectRatio: '3/4' }}>
      <img id='image' src={image} alt='' />
    </div>
  );
};

export default Images;
