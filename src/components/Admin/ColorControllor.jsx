import React from 'react';
import { useState, useEffect } from 'react';

const ColorControllor = ({ videoUtils }) => {
  const [RGB, setRGB] = useState({ r: 0, g: 0, b: 0 });

  useEffect(() => {
    // console.log(RGB);
    // if (videoUtils) videoUtils.color = RGB;
    videoUtils?.changeColor(RGB);
  }, [RGB, videoUtils]);

  const handleRvalue = (e) => {
    setRGB({ ...RGB, r: parseInt(e.target.value) });
  };
  const handleGvalue = (e) => {
    setRGB({ ...RGB, g: parseInt(e.target.value) });
  };
  const handleBvalue = (e) => {
    setRGB({ ...RGB, b: parseInt(e.target.value) });
  };
  return (
    <div className='flex flex-col'>
      <div className='flex gap-2'>
        <p>R</p>
        <input type='range' min={0} max={255} onChange={handleRvalue} />
      </div>
      <div className='flex gap-2'>
        <p>G</p>
        <input type='range' min={0} max={255} onChange={handleGvalue} />
      </div>
      <div className='flex gap-2'>
        <p>B</p>
        <input type='range' min={0} max={255} onChange={handleBvalue} />
      </div>
    </div>
  );
};

export default ColorControllor;
