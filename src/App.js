import { useState, useRef, useEffect } from 'react';
import './App.css';
import Images from './components/Images';
import UI from './components/UI';
import Video from './components/Video';
import { io } from 'socket.io-client';

function App() {
  const SERVER_URL = 'http://localhost:3030/';

  let socket;
  useEffect(() => {
    // if (!socket) socket = io.connect(SERVER_URL);
    console.log('connecting to socket');
    socket = io.connect(SERVER_URL);
  }, []);

  const userVid = useRef();

  const [image, setImage] = useState(null);
  const [vid, setVid] = useState(false);

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
