import { useState, useRef, useEffect } from 'react';
import './App.css';
import Images from './components/Images';
import UI from './components/UI';
import { io } from 'socket.io-client';

function App() {
  const SERVER_URL = 'http://localhost:3030/';
  // const SERVER_URL = 'https://ar-kiosk-proto.herokuapp.com/';

  const [socket, setSocket] = useState();

  const userVid = useRef();

  const [image, setImage] = useState(null);
  const [vid, setVid] = useState(false);

  // let socket;
  useEffect(() => {
    if (!socket) console.log('no socket');

    const c = () => {
      const s = io.connect(SERVER_URL);
      setSocket(s);
    };

    c();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!vid) {
      if (userVid.current?.srcObject) {
        userVid.current.srcObject = null;
      }
      return;
    }

    const getVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });
      userVid.current.srcObject = stream;
    };
    getVideo();
  }, [vid]);

  if (!socket) return null;

  return (
    <div className='App'>
      <div className='videoContainer' style={{ backgroundColor: 'black' }}>
        {/* <Video vid={vid} /> */}
        <video ref={userVid} id='userCam' autoPlay playsInline></video>

        <Images image={image} />
      </div>
      <UI
        socket={socket}
        setImage={setImage}
        userVid={userVid}
        image={image}
        setVid={setVid}
        vid={vid}
      />
      <p className='timerP'></p>
    </div>
  );
}

export default App;
