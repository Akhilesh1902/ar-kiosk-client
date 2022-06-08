import React, { useState } from 'react';
import { useRef, useEffect } from 'react';

const Video = ({ vid }) => {
  const userVid = useRef();
  //   const [vStream, setVStream] = useState();

  useEffect(() => {
    console.log('changing videosdf');
    if (!vid) {
      if (userVid.current.srcObject) {
        userVid.current.srcObject = null;
      }
      return;
    }
    getVideo();
  }, [vid]);

  const getVideo = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    console.log(userVid.current.srcObject);
    userVid.current.srcObject = stream;
    console.log(stream);
  };

  return <video ref={userVid} id='userCam' autoPlay playsInline></video>;
};

export default Video;
