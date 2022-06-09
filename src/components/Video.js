import React, { useState } from 'react';
import { useRef, useEffect } from 'react';

const Video = ({ vid }) => {
  const userVid = useRef();
  useEffect(() => {
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
    userVid.current.srcObject = stream;
  };

  return <video ref={userVid} id='userCam' autoPlay playsInline></video>;
};

export default Video;
