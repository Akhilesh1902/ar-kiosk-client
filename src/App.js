import { useState } from 'react';
import './App.css';
import Images from './components/Images';
import UI from './components/UI';
import Video from './components/Video';

function App() {
  const [image, setImage] = useState(null);
  const [vid, setVid] = useState(false);
  return (
    <div className='App'>
      <div className='videoContainer' style={{ backgroundColor: 'black' }}>
        <Video vid={vid} />
        <Images image={image} />
      </div>
      <UI setImage={setImage} setVid={setVid} vid={vid} />
    </div>
  );
}

export default App;
