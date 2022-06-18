import React, { useRef, useState, useEffect } from 'react';
import Images from '../components/Images';
import UI from '../components/UI';
import ImageProperties from '../components/UI/ImageProperties';

const Kiosk = ({ socket, SERVER_URL }) => {
  const userVid = useRef();

  const [image, setImage] = useState(null);
  const [vid, setVid] = useState(false);
  const [imgScale, setImageScale] = useState(50);
  const [edit, setEdit] = useState({ edit: false, imgScale: 50 });

  useEffect(() => {
    if (!vid) {
      if (userVid.current?.srcObject) {
        userVid.current.srcObject = null;
      }
      return;
    }

    const getVideo = async () => {
      const stream = await navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: true,
        })
        .catch((err) => {
          console.log(err);
          alert('no camera found');
          setVid(false);
          setImage('');
        });
      userVid.current.srcObject = stream;
    };
    getVideo();
  }, [vid]);

  if (!socket) return null;

  return (
    <div className='App overflow-hidden relative grid bg-dark  place-items-center'>
      <div
        className='videoContainer z-10 w-screen h-screen items-center flex'
        style={{ background: 'none' }}>
        {/* <Video vid={vid} /> */}
        <video
          ref={userVid}
          id='userCam'
          autoPlay
          playsInline
          className='h-screen w-screen object-cover'></video>

        <Images image={image} edit={edit} imgScale={imgScale} vid={vid} />
        {edit.edit && <ImageProperties setImageScale={setImageScale} />}
      </div>
      <UI
        edit={edit}
        setEdit={setEdit}
        socket={socket}
        setImage={setImage}
        userVid={userVid}
        image={image}
        setVid={setVid}
        vid={vid}
        SERVER_URL={SERVER_URL}
      />
      <p className='timerP z-50'></p>
    </div>
  );
};

export default Kiosk;
