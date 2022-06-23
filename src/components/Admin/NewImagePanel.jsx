import React, { useRef, useState } from 'react';
import Modal from './Modal';
import DraggablePreview from './DraggablePreview';

const NewImagePanel = ({ socket }) => {
  const image_input_ref = useRef();
  const [modal, setModal] = useState();
  const thumbRef = useRef();
  const [imgData, setImgData] = useState({
    name: '',
    thumbName: '',
    type: 'addition',
    file: null,
    thumbnail: null,
    scale: 20,
    pos: [0.5, 0.5],
  });

  const onFileCange = (e) => {
    console.log(e.target.id);
    if (e.target.id === 'image-input') {
      const IURL = URL.createObjectURL(e.target.files[0]);
      const imageName = e.target.files[0].name;
      setImgData({
        ...imgData,
        file: e.target.files[0],
        url: IURL,
        name: imageName,
      });
      return;
    } else {
      const IURL = URL.createObjectURL(e.target.files[0]);
      thumbRef.current.style.backgroundImage = `url(${IURL})`;
      console.log(e.target.files[0]);
      const thumbName = e.target.files[0].name;
      console.log(e.target.files[0].name);
      setImgData({ ...imgData, thumbnail: e.target.files[0], thumbName });
    }
    // image_display_ref.current.src = IURL;
    console.log(imgData);
  };

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
    setImgData({ ...imgData, name: '', file: null });
    image_input_ref.current.value = null;
    thumbRef.current.style.backgroundImage = `none`;
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
              {/* <input
                type='text'
                value={imgData.name}
                onChange={(e) => {
                  // setImgData({ ...imgData, name: e.target.value });
                }}
                placeholder='Enter image name with extension'
                className='p-1 px-2 self-start'
              /> */}
              <div>
                <p>Add in thumbnail</p>
                <div className='flex'>
                  <div
                    ref={thumbRef}
                    className='bg-accent w-20 h-20 !bg-cover !bg-top'></div>
                  <input
                    ref={image_input_ref}
                    type='file'
                    id='thumbnail-input'
                    accept='image/jpeg, image/png,image/jpg'
                    required
                    onChange={onFileCange}
                  />
                </div>
              </div>
              <div className='flex flex-col'>
                <p>Add in image</p>
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
              <DraggablePreview imgData={imgData} setImgData={setImgData} />
            </div>
            <div className='flex flex-col'>
              <h1>Add postion and scaling setting</h1>
              <div>
                <p>Set Scale</p>
                <input
                  value={imgData.scale * 200}
                  onChange={(e) =>
                    setImgData({ ...imgData, scale: e.target.value / 200 })
                  }
                  type='range'
                  min='20'
                  max='200'
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
