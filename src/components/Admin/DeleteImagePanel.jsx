import React, { useRef, useState } from 'react';
import { useGetImageArray } from '../utils/utils';
import Modal from './Modal';

const DeleteImagePanel = ({ socket, SERVER_URL }) => {
  const [imgArr, reloadImgArr] = useGetImageArray(SERVER_URL, socket);
  const [modal, setModal] = useState();

  const imageRef = useRef();

  const handleImageClick = (e) => {
    // console.log(imageRef.current);
    // console.log(e.target);
    const imageName = imageRef.current.src.split('/')[5];
    console.log(imageName);
    socket.emit('_image_update', {
      imgData: { name: imageName, type: 'deletion' },
    });
    setModal(false);
  };

  socket.on('_image_update', () => {
    reloadImgArr();
  });

  return (
    <div className='flex flex-col h-full '>
      <h1 className='py-2 '>Click on Image to delete from server</h1>
      <div className='flex img_container content-start justify-start items-start flex-wrap h-full'>
        {imgArr.map((data, i) => {
          return (
            <div key={i} className='w-24 mr-1 h-24'>
              <img
                ref={imageRef}
                className='w-24 h-full  object-cover object-top rounded border border-dark'
                src={`${SERVER_URL}${data.url}`}
                alt=''
                onClick={() => {
                  setModal(true);
                }}
              />
            </div>
          );
        })}
        {modal && (
          <Modal
            type='deletion'
            setModal={setModal}
            handleSubmit={handleImageClick}
          />
        )}
      </div>
    </div>
  );
};

export default DeleteImagePanel;
