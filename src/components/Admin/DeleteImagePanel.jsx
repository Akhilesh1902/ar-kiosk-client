import React from 'react';
import { useGetImageArray } from '../utils/utils';

const DeleteImagePanel = ({ socket, SERVER_URL }) => {
  const [imgArr] = useGetImageArray(SERVER_URL, socket);

  const handleImageClick = (e) => {
    const clickedImg = imgArr.find((img) => img.link === e.target.src);
    debugger;
    if (window.confirm(`Confirm Delete?\nImage : ${clickedImg.name}`)) {
      // socket.emit('_image_update', { img: clickedImg });
    }
  };

  return (
    <div className='flex flex-col h-full '>
      <h1 className='py-2 '>Click on Image to delete from server</h1>
      <div className='flex img_container content-start justify-start items-start flex-wrap h-full'>
        {imgArr.map((data, i) => {
          return (
            <div key={i} className='w-24 mr-1 h-24'>
              <img
                className='w-24 h-full rounded border border-dark'
                src={`${SERVER_URL}${data.url}`}
                alt=''
                onClick={handleImageClick}
              />
            </div>
          );
        })}
        {/* <Modal type={type} /> */}
      </div>
    </div>
  );
};

export default DeleteImagePanel;
