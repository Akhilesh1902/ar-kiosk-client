import React, { useState, useRef, useEffect } from 'react';
import Modal from './Modal';
import { VideoUtil } from '../utils/videoUtil';
import DraggablePreview from './DraggablePreview';
// import ColorControllor from './ColorControllor';

const NewVideoPanel = ({ socket, SERVER_URL }) => {
  const [modal, setModal] = useState(false);
  const video_imput_ref = useRef();
  const thumb_input_ref = useRef();
  const thumbRef = useRef();
  const userVid = useRef();
  const userCam = useRef();
  const c1 = useRef();
  const c2 = useRef();
  const [videoUtils, setVideoUtils] = useState();
  const [tolerance, setTolerance] = useState(100);
  const [videoData, setVideoData] = useState({
    name: '',
    thumbName: '',
    type: 'video/mp4',
    file: null,
    thumbnail: null,
    chromaKey: 100,
  });

  useEffect(() => {
    if (videoUtils) videoUtils.tolerance = tolerance;
    setVideoData({ ...videoData, chromaKey: tolerance });
    //eslint-disable-next-line
  }, [tolerance, videoUtils]);

  useEffect(() => {
    const video = new VideoUtil(userVid.current, c1.current, c2.current);
    // console.log(video);
    setVideoUtils(video);
    // eslint-disable-next-line
  }, [userVid.current, c1.current, c2.current]);

  const onFileCange = (e) => {
    const file = e.target.files[0];

    const IURL = URL.createObjectURL(file);
    if (file.type === 'video/mp4') {
      // console.log(file);
      setVideoData({
        ...videoData,
        type: file.type,
        name: file.name.replace(/ /g, '_'),
        file,
      });
      userVid.current.src = IURL;
    } else {
      setVideoData({ ...videoData, thumbName: file.name, thumbnail: file });
      thumbRef.current.style.backgroundImage = `url(${IURL})`;
    }
  };

  useEffect(() => {
    socket.on('_scuccess', (addr) => {
      console.log('upload success');
      alert('Your File Uploaded Successfully');
    });

    socket.on('_exist_in_dataBase', (result) => {
      alert('file already exist in database try changing file name');
      console.log(result);
    });
    return () => {
      socket.off('_scuccess');

      socket.off('_exist_in_dataBase');
    };
  }, [socket]);

  const handleSubmit = () => {
    socket.emit('_image_update', {
      imgData: { ...videoData },
      updateType: 'video',
    });
    userVid.current.src = null;
    thumbRef.current.style.backgroundImage = `none`;
    thumb_input_ref.current.value = null;
    video_imput_ref.current.value = null;
    c1.current
      .getContext('2d')
      .clearRect(0, 0, c1.current.width, c1.current.height);
    c2.current
      .getContext('2d')
      .clearRect(0, 0, c2.current.width, c2.current.height);
    setModal(false);
  };

  return (
    <div className='overflow-y-scroll'>
      <h1 className='mt-4 font-medium'>Add More Images To Kiosk</h1>
      <div className='pt-4'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setModal(true);
          }}
          className='image-form w-full flex gap-3 mt-4'>
          <div className='flex w-full justify-between gap-3'>
            <div className='flex  flex-col gap-3'>
              <div>
                <p>Add in thumbnail</p>
                <div className='flex'>
                  <div
                    ref={thumbRef}
                    className='bg-accent w-20 h-20 !bg-cover !bg-top'></div>
                  <input
                    ref={thumb_input_ref}
                    type='file'
                    id='thumbnail-input'
                    accept='image/jpeg, image/png,image/jpg,.mp4'
                    required
                    onChange={onFileCange}
                  />
                </div>
              </div>
              <div className='flex  flex-col'>
                <p>Add in image</p>
                <input
                  ref={video_imput_ref}
                  type='file'
                  id='image-input'
                  accept='.mp4'
                  required
                  onChange={onFileCange}
                />
                <span className='p-0 m-0 leading-none ml-2 text-xs  italic'>
                  max-size:8.5mb
                </span>
                <div
                  id='display-image'
                  className='w-full h-52 flex overflow-hidden bg-dark bg-center bg-cover rounded aspect-video z-10 relative'>
                  <video
                    autoPlay
                    playsInline
                    preload='auto'
                    ref={userCam}
                    className=' h-full w-full absolute object-cover z-20'></video>
                  {/* <video
                    ref={userVid}
                    autoPlay
                    playsInline
                    className=' cursor-move absolute !select-none top-50 left-50 z-30'
                  /> */}
                  <DraggablePreview
                    imgData={videoData}
                    setImgData={setVideoData}
                    c2={c2}
                  />
                  {/* <canvas id='c2' ref={c2}></canvas> */}
                </div>
              </div>
            </div>
            <div className=''>
              <video
                ref={userVid}
                autoPlay
                playsInline
                // controls
                loop
                className=' cursor-move w-80 !select-none top-50 left-50 z-30'
              />
              <canvas id='c1' className='' ref={c1}></canvas>
              <div className='mt-5 flex flex-col gap-2'>
                <p>Set Chroma Key {`[tolerance]`}</p>
                <input
                  type='number'
                  value={tolerance}
                  onChange={(e) => setTolerance(e.target.value)}
                />
                {/* <ColorControllor videoUtils={videoUtils} /> */}
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

export default NewVideoPanel;
