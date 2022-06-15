import { useState, useEffect } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import Pages from './Pages';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const SERVER_URL = 'http://localhost:3030';
  // const SERVER_URL = 'http://192.168.199.127:3000';
  // const SERVER_URL = 'https://ar-kiosk-proto.herokuapp.com';

  const [socket, setSocket] = useState();

  // const userVid = useRef();

  // const [image, setImage] = useState(null);
  // const [vid, setVid] = useState(false);

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

  // useEffect(() => {
  //   if (!vid) {
  //     if (userVid.current?.srcObject) {
  //       userVid.current.srcObject = null;
  //     }
  //     return;
  //   }

  //   const getVideo = async () => {
  //     const stream = await navigator.mediaDevices
  //       .getUserMedia({
  //         audio: false,
  //         video: true,
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         alert('no camera found');
  //         setVid(false);
  //         setImage('');
  //       });
  //     userVid.current.srcObject = stream;
  //   };
  //   getVideo();
  // }, [vid]);

  // if (!socket) return null;

  return (
    <BrowserRouter>
      <Pages socket={socket} SERVER_URL={SERVER_URL} />
    </BrowserRouter>
    // <div className='App grid bg-dark  place-items-center'>
    //   <div
    //     className='videoContainer w-screen h-screen items-center flex'
    //     style={{ background: 'none' }}>
    //     {/* <Video vid={vid} /> */}
    //     <video
    //       ref={userVid}
    //       id='userCam'
    //       autoPlay
    //       playsInline
    //       className='h-screen w-screen object-cover'></video>

    //     <Images image={image} vid={vid} />
    //   </div>
    //   <UI
    //     socket={socket}
    //     setImage={setImage}
    //     userVid={userVid}
    //     image={image}
    //     setVid={setVid}
    //     vid={vid}
    //     SERVER_URL={SERVER_URL}
    //   />
    //   <p className='timerP'></p>
    // </div>
  );
}

export default App;
