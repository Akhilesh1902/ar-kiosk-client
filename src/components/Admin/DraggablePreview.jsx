import React from 'react';
import { useRef, useEffect } from 'react';
import Draggable from 'react-draggable';

const DraggablePreview = ({ imgData, setImgData }) => {
  console.log(imgData);
  const userVid = useRef();
  const image_display_ref = useRef();

  useEffect(() => {
    // const containerWidth = document.querySelector('#display-image').clientWidth;
    // const containerHeight =
    // document.querySelector('#display-image').clientHeight;
    image_display_ref.current.style.height = `${imgData.scale * 2}px`;
    // image_display_ref.current.style.top = `${
    //   containerHeight * imgData.pos[1]
    // }px`;
    // image_display_ref.current.style.left = `${
    //   containerWidth * imgData.pos[0]
    // }px`;
  }, [imgData.scale, imgData.pos]);

  useEffect(() => {
    // const imageContainer = document.querySelector('#display-image');
    // imageContainer.addEventListener('click', (e) => {
    //   const posx =
    //     (e.clientX - e.target.clientWidth) / e.target.clientWidth + 0.55;
    //   const posy =
    //     (e.clientY - e.target.clientHeight) / e.target.clientHeight - 0.35;
    //   const pos = [Math.abs(posx), Math.abs(posy)];
    //   setImgData((prev) => ({ ...prev, pos }));
    // });
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
    const containerOffsets = e.target
      .closest('#display-image')
      .getBoundingClientRect();
    // .getBoundingClientRect();
    console.log(containerOffsets);

    const x =
      (offsets.x - containerOffsets.x + offsets.width) / containerOffsets.x;
    const y =
      (offsets.y - containerOffsets.y + offsets.height) /
      containerOffsets.height;

    console.log(offsets.x - containerOffsets.x + offsets.width);

    // console.log(offsets);

    const posX = x > 1 ? 1 : x < 0 ? 0 : x;
    const posY = y > 1 ? 1 : y < 0 ? 0 : y;

    const arr = [posX, posY];

    console.log(arr);
    // console.log(x, y);
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
