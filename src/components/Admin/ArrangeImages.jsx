import React, { useState } from 'react';
import { useGetImageArray } from '../utils/utils';

const ArrangeImages = ({ socket, SERVER_URL }) => {
  const [selected, setSelected] = useState('');
  const [imgArr] = useGetImageArray(SERVER_URL, socket);

  const handleImageClick = (e) => {
    if (selected) {
      console.log(imgArr);
      //   console.log(arr);
      const f = imgArr.find((i) => i.link === selected);
      const s = imgArr.find((i) => i.link === e.target.src);

      const i = imgArr.indexOf(f);
      const j = imgArr.indexOf(s);

      let a = imgArr[i];

      imgArr[i] = imgArr[j];
      imgArr[j] = a;
      setSelected('');
      socket.emit('img_rearranged', { imgArr });
      return;
    }
    setSelected(e.target.src);
  };

  return (
    <div className='flex flex-col h-full '>
      <h1 className='py-2 '>Click on two Images to swap</h1>
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

export default ArrangeImages;
