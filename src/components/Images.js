import React, { useRef } from 'react';

const Images = ({ image }) => {
  //   const URI = 'https://source.unsplash.com/random';
  const img = useRef();
  console.log(image);

  //   useEffect(() => {
  //     const fetch = async () => {};
  //   }, []);

  if (img.current) {
    console.log('img');
    img.current.style.backgroundImage = `url(${image})`;
    //   img.current.src = URI;
  }

  return (
    <div className='kiosk-image'>
      <div className='image' ref={img}></div>
      {/* <img id='image' ref={img} src={image} alt='' /> */}
    </div>
  );
};

export default Images;
