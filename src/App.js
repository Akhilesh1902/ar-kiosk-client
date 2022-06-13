import { useState, useRef } from 'react';
import './App.css';
import Images from './components/Images';
import UI from './components/UI';
import Video from './components/Video';

function App() {
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
        setImage={setImage}
        userVid={userVid}
        image={image}
        setVid={setVid}
        vid={vid}
      />
    </div>
  );
}

export default App;
