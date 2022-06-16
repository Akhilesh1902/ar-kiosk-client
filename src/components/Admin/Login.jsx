import React, { useState } from 'react';

const Login = ({ setLogin }) => {
  const [_user, _setUser] = useState({ name: '', password: '' });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (_user.name !== 'admin' || _user.password !== 'admin') {
      alert('incorrect username and password');
      return;
    }

    setLogin(true);
  };

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center bg-slate'>
      <h1 className='mb-2 text-gray text-lg'>Enter Login Credentials</h1>
      <form
        onSubmit={handleFormSubmit}
        action=''
        className='flex flex-col gap-3'>
        <input
          type='text'
          placeholder='UserName'
          value={_user.name}
          onChange={(e) => {
            _setUser({ ..._user, name: e.target.value });
          }}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={_user.password}
          onChange={(e) => {
            _setUser({ ..._user, password: e.target.value });
          }}
          required
        />
        <button type='submit' className='bg-accent p-2 px-4 rounded'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
