import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Admin from './Admin';
import Kiosk from './Kiosk';

const index = ({ socket, SERVER_URL }) => {
  return (
    <Routes>
      <Route
        path='/'
        element={<Kiosk socket={socket} SERVER_URL={SERVER_URL} />}
      />
      <Route
        path='/admin'
        element={<Admin socket={socket} SERVER_URL={SERVER_URL} />}
      />
    </Routes>
  );
};

export default index;
