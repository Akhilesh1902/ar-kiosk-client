import React, { useRef, useEffect } from 'react';
import { VideoUtil } from './utils/videoUtil';

const Video = ({ video, SERVER_URL }) => {
  console.log(video);

  console.log('remdering video');
  const video_ref = useRef();
  const c1 = useRef();
  const c2 = useRef();

  useEffect(() => {
    video_ref.current.crossOrigin = 'anonymous';

    video_ref.current.src = video.url;
    // video_ref.current.src = `${SERVER_URL}${video.url}`;
    // eslint-disable-next-line
  }, [SERVER_URL]);

  useEffect(() => {
    const video = new VideoUtil(video_ref.current, c1.current, c2.current);
    console.log(video);
    // eslint-disable-next-line
  }, [video_ref.current, c1.current, c2.current]);

  return (
    <>
      <div className=' z-20 absolute flex  h-screen w-screen'>
        <canvas className='z-30 w-full self-center' id='c2' ref={c2}></canvas>
      </div>
      <canvas id='c1' className='z-30 hidden' ref={c1}></canvas>
      <video
        playsInline
        autoPlay
        loop
        ref={video_ref}
        className='!h-40 '></video>
    </>
  );
};

export default Video;
