import React, { useRef, useState, useEffect } from 'react';
import Modal from './Modal';

const NewImagePanel = ({ socket }) => {
  const image_input_ref = useRef();
  const image_display_ref = useRef();
  const userVid = useRef();

  const [modal, setModal] = useState();

  const [imgData, setImgData] = useState({
    name: '',
    type: 'addition',
    file: null,
    scale: 20,
    pos: [0.5, 0.5],
  });

  const onFileCange = (e) => {
    setImgData({ ...imgData, file: e.target.files[0] });
    const IURL = URL.createObjectURL(e.target.files[0]);
    image_display_ref.current.src = IURL;
  };

  useEffect(() => {
    const containerWidth = document.querySelector('#display-image').clientWidth;
    const containerHeight =
      document.querySelector('#display-image').clientHeight;
    image_display_ref.current.style.height = `${imgData.scale * 2}px`;
    image_display_ref.current.style.top = `${
      containerHeight * imgData.pos[1]
    }px`;
    image_display_ref.current.style.left = `${
      containerWidth * imgData.pos[0]
    }px`;
  }, [imgData.scale, imgData.pos]);

  useEffect(() => {
    const imageContainer = document.querySelector('#display-image');
    imageContainer.addEventListener('click', (e) => {
      const posx =
        (e.clientX - e.target.clientWidth) / e.target.clientWidth + 0.55;
      const posy =
        (e.clientY - e.target.clientHeight) / e.target.clientHeight - 0.35;
      const pos = [Math.abs(posx), Math.abs(posy)];
      setImgData((prev) => ({ ...prev, pos }));
    });
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
      console.log(stream);
      userVid.current.srcObject = stream;
    };
    getVideo();
  }, []);

  const handleSubmit = (e) => {
    console.log('submitting image');
    const ext = ['jpg', 'jpeg', 'png'];
    const curExt = imgData.name.split('.').pop();
    if (!ext.includes(curExt)) {
      console.log('wrong extension');
      alert('wrong extension');
      return;
    }
    console.log('uploading');
    // alert('Image being uploaded');
    socket.emit('_image_update', { imgData });
    setModal(false);
  };

  return (
    <div>
      <h1 className='mt-4 font-medium'>Add More Images To Kiosk</h1>
      <div className='pt-4'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setModal(true);
          }}
          className='image-form w-full flex  gap-3 mt-4'>
          <div className='flex w-full justify-between gap-3'>
            <div className='flex  flex-col gap-3'>
              {/* <h2 className=' '>Add more Images to Kiosk</h2> */}
              <input
                type='text'
                value={imgData.name}
                onChange={(e) => {
                  setImgData({ ...imgData, name: e.target.value });
                }}
                placeholder='Enter image name with extension'
                className='p-1 px-2 self-start'
              />
              <div className='flex flex-col'>
                <input
                  ref={image_input_ref}
                  type='file'
                  id='image-input'
                  accept='image/jpeg, image/png,image/jpg'
                  required
                  onChange={onFileCange}
                />
                <span className='p-0 m-0 leading-none ml-2 text-xs  italic'>
                  max-size:3.5mb
                </span>
              </div>
              <div
                id='display-image'
                className='w-full h-52 flex overflow-hidden bg-dark bg-center bg-cover rounded aspect-video z-10 relative'>
                <video
                  autoPlay
                  playsInline
                  ref={userVid}
                  className=' h-full w-full absolute object-cover z-20'></video>
                <img
                  ref={image_display_ref}
                  src=''
                  alt=''
                  id='preview_image'
                  className=' absolute top-50 left-50 z-30'
                />
              </div>
            </div>
            <div className='flex flex-col'>
              <h1>Add postion and scaling setting</h1>
              <div>
                <p>Set Scale</p>
                <input
                  value={imgData.scale}
                  onChange={(e) =>
                    setImgData({ ...imgData, scale: e.target.value })
                  }
                  type='range'
                  min='20'
                  max='100'
                />
                <p>Click on the canvas to position the image</p>
              </div>
            </div>
          </div>

          <button type='submit' className='bg-lime w-fit px-4 py-1 rounded-md'>
            Submit
          </button>
        </form>
        {modal && (
          <Modal
            type='addition'
            setModal={setModal}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default NewImagePanel;
