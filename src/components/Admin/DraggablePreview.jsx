import React from 'react';
import { useRef, useEffect } from 'react';
import Draggable from 'react-draggable';

const DraggablePreview = ({ imgData, setImgData }) => {
  // console.log(imgData);
  const userVid = useRef();
  const image_display_ref = useRef();

  useEffect(() => {
    image_display_ref.current.style.height = `${imgData.scale * 200}px`;
    // console.log(imgData.scale);

    if (imgData.file == null) {
      image_display_ref.current.src = '';
    }
  }, [imgData.scale, imgData.pos, imgData.file]);

  useEffect(() => {
    const getVideo = async () => {
      const stream = await navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: true,
        })
        .catch((err) => {
          console.log(err);
          alert('no camera found');
        });
      userVid.current.srcObject = stream;
    };
    getVideo();
  }, []);

  const handleOnDrag = (e) => {
    const offsets = e.target.getBoundingClientRect();
    const cOffsets = e.target.closest('#display-image').getBoundingClientRect();
    // .getBoundingClientRect();

    const x = (offsets.x - cOffsets.x) / cOffsets.width;
    const y = (offsets.y - cOffsets.y) / cOffsets.height;

    // console.log(offsets.x / (cOffsets.x + cOffsets.width - offsets.width));
    // console.log(offsets.y / (cOffsets.y + cOffsets.height - offsets.height));

    // console.log(offsets.x - cOffsets.x + offsets.width);

    // console.log(offsets);

    const posX = x > 1 ? 1 : x < 0 ? 0 : x;
    const posY = y > 1 ? 1 : y < 0 ? 0 : y;

    const arr = [posX, posY];

    // console.log(arr);
    // console.log(x, y);
    setImgData({ ...imgData, pos: arr });
  };

  return (
    <div
      id='display-image'
      className='w-full h-52 flex overflow-hidden bg-dark bg-center bg-cover rounded aspect-video z-10 relative'>
      <video
        autoPlay
        playsInline
        ref={userVid}
        className=' h-full w-full absolute object-cover z-20'></video>
      <Draggable onDrag={handleOnDrag}>
        <img
          ref={image_display_ref}
          src={imgData.url}
          alt=''
          id='preview_image'
          className=' absolute cursor-move !select-none top-50 left-50 z-30'
        />
      </Draggable>
    </div>
  );
};

export default DraggablePreview;
