import { useState, useEffect } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import Pages from './Pages';
import { BrowserRouter } from 'react-router-dom';

function App() {
  // const SERVER_URL = 'http://localhost:3030';
  const SERVER_URL = 'https://ar-kiosk-proto.herokuapp.com';

  const [socket, setSocket] = useState();
  useEffect(() => {
    if (!socket) console.log('no socket');
    const c = () => {
      const s = io.connect(SERVER_URL);
      setSocket(s);
    };
    c();
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Pages socket={socket} SERVER_URL={SERVER_URL} />
    </BrowserRouter>
  );
}

export default App;
