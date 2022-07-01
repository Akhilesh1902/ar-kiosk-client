import React from 'react';
import { useRef, useEffect } from 'react';

const Images = ({ image, SERVER_URL }) => {
  const imgRef = useRef();

  console.log(image);

  useEffect(() => {
    if (image) {
      imgRef.current.style.left = `${image.pos[0] * window.innerWidth}px`;
      imgRef.current.style.top = `${image.pos[1] * window.innerHeight}px`;
      imgRef.current.style.height = `${image.scale * 200}`;

      const arrayBufferView = new Uint8Array(image.Data);
      const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
      var urlCreator = window.URL || window.webkitURL;
      var imageUrl = urlCreator.createObjectURL(blob);
      imgRef.current.src = imageUrl;
    }
    // eslint-disable-next-line
  }, [image?.name, imgRef]);

  return (
    <div className='kiosk-image  w-full right-5'>
      <img
        ref={imgRef}
        id='image'
        className=' absolute w-50'
        src=''
        alt=''
        style={{ height: `${image?.scale * 200}px` }}
      />
    </div>
  );
};

export default Images;
