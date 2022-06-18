import React from 'react';

const ImageProperties = ({ imgScale, setImageScale }) => {
  return (
    <div
      id='img_props'
      className='flex flex-col bg-dark p-4 rounded items-center absolute w-fit z-40 left-1/2  -translate-x-1/2'>
      <h1 className='font-bold text-mid'>Set the Properties of the Images</h1>
      <div className='flex self-start justify-start items-start flex-col'>
        <p className='text-accent text-sm mt-4'>Scale</p>
        <input
          type='range'
          min={20}
          className='p-1'
          //   value={imgScale}
          max={200}
          onChange={(e) => {
            setImageScale(e.target.value);
          }}
        />
        <p className='text-text text-sm leading-none mt-3'>
          Click on the background <br /> to position the image
        </p>
      </div>
    </div>
  );
};

export default ImageProperties;
