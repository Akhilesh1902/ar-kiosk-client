import React from 'react';

const Modal = ({ type }) => {
  return (
    <div className='absolute w-fit h-fit text-text p-2 rounded flex flex-col items-center inset-1/2 bg-gray'>
      <h1>{type === 'deletion' ? 'Confirm Delete' : 'Confirm Add Image'}</h1>
      <div className='flex gap-2 text-text leading-none pt-4'>
        <button className='bg-accent p-2 px-3 rounded'>Decline</button>
        <button className='bg-mid  p-2 px-3 rounded'>Accept</button>
      </div>
    </div>
  );
};

export default Modal;
