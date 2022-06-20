import React from 'react';
import { useRef, useEffect } from 'react';

const Images = ({ image, SERVER_URL }) => {
  console.log(image);
  const imgRef = useRef();

  useEffect(() => {
    console.log(imgRef.current);

    const container = document.querySelector('.videoContainer');
    console.log(container.clientWidth);
    console.log(container.offsetWidth);
    console.log(window.innerWidth);
    console.log(window.innerHeight);

    if (image) {
      console.log('changing');
      console.log(image.pos[0] * window.innerWidth);

      imgRef.current.style.left = `${image.pos[0] * window.innerWidth}px`;
      imgRef.current.style.top = `${image.pos[1] * window.innerHeight}px`;
    }
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
