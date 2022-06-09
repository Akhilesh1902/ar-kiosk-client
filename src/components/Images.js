import React, { useRef } from 'react';

const Images = ({ image }) => {
  return (
    <div className='kiosk-image'>
      <img id='image' src={image} alt='' />
    </div>
  );
};

export default Images;
