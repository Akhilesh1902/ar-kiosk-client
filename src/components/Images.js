import React from 'react';
import { useRef, useEffect } from 'react';

const Images = ({ image, SERVER_URL }) => {
  const imgRef = useRef();

  useEffect(() => {
    if (image) {
      console.log(image.pos);
      imgRef.current.style.left = `${image.pos[0] * window.innerWidth}px`;
      imgRef.current.style.top = `${image.pos[1] * window.innerHeight}px`;
    }
    // eslint-disable-next-line
  }, [image?.name, imgRef]);

  return (
    <div className='kiosk-image  w-full right-5'>
      <img
        ref={imgRef}
        id='image'
        className=' absolute w-50 h-50 '
        src={SERVER_URL + image?.url}
        alt=''
      />
    </div>
  );
};

export default Images;
