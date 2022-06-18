import React from 'react';
import { useRef } from 'react';

const Images = ({ image, imgScale, left, top, edit }) => {
  const imgRef = useRef();

  if (edit.edit) {
    document.querySelector('.videoContainer').addEventListener('click', (e) => {
      if (e.target.id === 'userCam' || e.target.id === 'uiContainer') {
        if (edit.edit) {
          imgRef.current.style.top = `${
            e.clientY - imgRef.current.offsetHeight / 2
          }px`;
          imgRef.current.style.left = `${
            e.clientX - imgRef.current.offsetHeight / 2
          }px`;
          // console.log(e.clientY);
        }
      }
    });
  }
  return (
    <div
      className='kiosk-image absolute w-fit right-5'
      ref={imgRef}
      style={{ aspectRatio: '3/4', top: `${top}px`, left }}>
      <img
        id='image'
        className='width-auto h-40'
        style={{ height: `${imgScale * 2}px` }}
        src={image}
        alt=''
      />
    </div>
  );
};

export default Images;
