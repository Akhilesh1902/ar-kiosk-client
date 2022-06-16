import React, { useState } from 'react';
import Dashnboard from '../components/Admin/Dashnboard';
import Login from '../components/Admin/Login';

const Admin = ({ socket, SERVER_URL }) => {
  const [login, setLogin] = useState();

  if (!login) {
    return <Login setLogin={setLogin} />;
  }

  return (
    <Dashnboard setLogin={setLogin} socket={socket} SERVER_URL={SERVER_URL} />
  );
};

export default Admin;
