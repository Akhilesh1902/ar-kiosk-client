import React from 'react';
import { useRef, useEffect } from 'react';

const Images = ({ image, SERVER_URL }) => {
  const imgRef = useRef();

  useEffect(() => {
    const fetchImg = async () => {
      // const img = await fetch(SERVER_URL + '/' + image.name);
      // const data = await img.json();
      // console.log(data);
    };
    fetchImg();
    if (image) {
      imgRef.current.style.left = `${image.pos[0] * window.innerWidth}px`;
      imgRef.current.style.top = `${image.pos[1] * window.innerHeight}px`;
      imgRef.current.style.height = `${image.scale * 200}`;
    }

    // eslint-disable-next-line
  }, [image?.name, imgRef]);

  return (
    <div className='kiosk-image  w-full right-5'>
      <img
        ref={imgRef}
        id='image'
        className=' absolute w-50'
        // src={SERVER_URL + image?.url}
        src={image?.url}
        alt=''
        style={{ height: `${image?.scale * 200}px` }}
      />
    </div>
  );
};

export default Images;
