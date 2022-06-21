import React, { useState } from 'react';
import { useGetImageArray } from '../utils/utils';
import Modal from './Modal';

const DeleteImagePanel = ({ socket, SERVER_URL }) => {
  const [imgArr, reloadImgArr] = useGetImageArray(SERVER_URL, socket);
  const [modal, setModal] = useState();

  const handleImageClick = (e) => {
    const imageName = e.target.src.split('/')[5];
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
