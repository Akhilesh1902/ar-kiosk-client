import React from 'react';
import { useGetImageArray } from '../utils/utils';

const ImagePositioning = ({ SERVER_URL, socket }) => {
  //   const [imgArr, setImgArr] = useState([]);

  const [imageArray] = useGetImageArray(SERVER_URL, socket);

  const handleImageClick = () => {};

  return (
    <div className='flex flex-col h-full '>
      <h1 className='py-2 '>Click on Image to view preview</h1>
      <div className='flex img_container content-start justify-start items-start flex-wrap h-fit'>
        {imageArray.map((data, i) => {
          return (
            <div key={i} className='w-10 mr-1 h-10'>
              <img
                className='w-24 h-full object-cover object-top rounded border border-dark'
                src={`${SERVER_URL}${data.url}`}
                alt=''
                onClick={handleImageClick}
              />
            </div>
          );
        })}
        {/* <Modal type={type} /> */}
      </div>
      <div className='flex w-full flex-1 justify-between mt-5'>
        <div className='previewContainer flex-1'>
          <h2>Preview Container</h2>
          <div></div>
        </div>
        <div className='settings panel'>
          <h2>Settings Container</h2>
          <div>
            <div className='flex self-start justify-start items-start flex-col'>
              <p className='text-accent text-sm mt-4'>Scale</p>
              <input
                type='range'
                min={20}
                className='p-1'
                //   value={imgScale}
                max={200}
                onChange={(e) => {
                  // setImageScale(e.target.value);
                }}
              />
              <p className='text-gray text-sm leading-none mt-3'>
                Click on the background <br /> to position the image
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePositioning;
