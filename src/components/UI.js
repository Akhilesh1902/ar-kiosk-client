import React, { useState } from 'react';

const UI = ({ setImage, setVid, vid }) => {
  const [userInput, setUserInput] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const URI = 'http://localhost:2020/static/images';

  const handleFetch = async (input) => {
    const res = await fetch(`${URI}/${input}.jpeg`);
    console.log(res);
    if (res.ok) {
      setImage(res.url);
    } else {
      alert('image is not in database');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput === '') {
      alert('empty input box');
      return;
    }
    console.log('going to fetch image');
    handleFetch(userInput);
  };
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };
  const handleEmailSubmission = (e) => {
    e.preventDefault();
    if (!userEmail.includes('@')) {
      alert('invalid email');
      return;
    }
    // use smtpjs to send emails
  };
  const handleCapture = () => {
    const poto = document.querySelector('.videoContainer');
    // use html2canvas package to convert to image
  };
  return (
    <div className='uiContainer'>
      <form onSubmit={handleEmailSubmission}>
        <input
          type='text'
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
        />
        <button type='submit'>get image via email</button>
      </form>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleInputChange} value={userInput} />
        <button type='submit'>fetch</button>
      </form>
      <button onClick={() => setVid(!vid)}>
        {vid ? 'turn off camera' : 'turn on camera'}
      </button>
      <button onClick={handleCapture}>capture image</button>
    </div>
  );
};

export default UI;
