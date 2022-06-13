import React, { useState, useEffect } from 'react';
import { AiFillCamera, AiFillVideoCamera } from 'react-icons/ai';
import html2canvas from 'html2canvas';
import { io } from 'socket.io-client';

const UI = ({ setImage, setVid, image, userVid, vid }) => {
  // const [userInput, setUserInput] = useState('');
  const [allImages, setAllImages] = useState([]);
  const [screenShot, setScreenShot] = useState();
  const [pCanvas, setPCanvas] = useState(false);
  const [modal, setModal] = useState(false);

  const SERVER_URL = 'http://localhost:3030/';

  let socket;

  useEffect(() => {
    socket = io.connect(SERVER_URL);
    console.log('here');
    const getAllImage = async () => {
      // debugger;
      const allImg = await fetch('http://localhost:3030/images');
      console.log(allImg);
      // debugger;
      const data = await allImg.json();
      console.log(data);
      setAllImages(data);
    };
    getAllImage().catch((err) => {
      console.log(err);
    });
  }, []);

  socket?.on('images_updated', () => {
    // getAllImage();
    console.log('here');
  });

  const handleCapture = async () => {
    if (!vid) {
      alert('turn on video');
      return;
    }
    // setModal(true);
    const poto = document.querySelector('.videoContainer');
    const canvas = await html2canvas(poto, {
      allowTaint: true,
      useCORS: true,
    });

    // displayImageToUser(canvas);
    setPCanvas(canvas);
    document.querySelector('.previewCanvasContainer').appendChild(canvas);

    // console.log(image);
    // downloadImage(image, 'yourImage');
  };

  const displayImageToUser = (canvas) => {
    // console.log(canvas);
    const canvasContainer = document.createElement('div');
    canvasContainer.classList.add('canvascontainer');
    canvasContainer.appendChild(canvas);
    const h = `
    <h1>hello</h1>`;
    // console.log(canvasContainer);
  };

  const downloadImage = (dImage, fName) => {
    const fakeLink = window.document.createElement('a');
    fakeLink.style = 'display:none';
    fakeLink.download = fName;
    fakeLink.href = dImage;
    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);
    fakeLink.remove();
  };

  const handleRetake = () => {
    document.querySelector('.previewCanvasContainer').removeChild(pCanvas);
    setPCanvas(null);
  };
  const handleImageDelevery = () => {
    document.querySelector('.previewCanvasContainer').removeChild(pCanvas);

    const image = pCanvas.toDataURL('image/png', 1.0);

    setScreenShot(image);
    setModal(true);
  };

  return (
    <div className='uiContainer'>
      <div className='button-container'>
        <button onClick={() => setVid(!vid)}>
          <AiFillVideoCamera color={vid ? '#c2968a' : '#8dc7a2'} />
        </button>
        <button onClick={handleCapture}>
          <AiFillCamera color={modal ? '#c2968a' : '#8dc7a2'} />
        </button>
      </div>
      {modal ? (
        <EmailModal
          screenShot={screenShot}
          setPCanvas={setPCanvas}
          setModal={setModal}
        />
      ) : null}
      {!vid ? (
        <>
          <h1>Select Photo</h1>
          <ImageGrid allImages={allImages} setImage={setImage} />
        </>
      ) : null}
      <div
        className='previewCanvasContainer'
        style={{ border: pCanvas && !modal ? '1px solid #c2968a' : 'none' }}>
        {pCanvas && !modal ? (
          <div className='UI'>
            <button className='button' onClick={handleRetake}>
              Retake
            </button>
            <button className='button' onClick={handleImageDelevery}>
              Get Image
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const EmailModal = ({ screenShot, setPCanvas, setModal }) => {
  // console.log(screenShot);
  const [userEmail, setUserEmail] = useState('');
  const handleEmailSubmission = (e) => {
    e.preventDefault();
    if (!userEmail.includes('@')) {
      alert('invalid email');
      return;
    }
    console.log(screenShot);
    // use smtpjs to send emails
    // socket.emit('send_image', { screenShot, userEmail });
    setModal(false);
    setPCanvas(null);
  };

  // function sendEmail() {
  //   Email.send({
  //     Host: 'smtp.mandrillapp.com',
  //     Username: 'test business',
  //     Password: 'wpU4pEDnFNeZIyLMi6dMXA',
  //     To: userEmail,
  //     From: 'liyakik847@dilanfa.com',
  //     Subject: 'your screenshot',
  //     Body: 'This is your screenShot',
  //     Attachments: [
  //       {
  //         name: 'smtpjs.png',
  //         path: screenShot,
  //       },
  //     ],
  //   }).then((message) => alert('mail sent successfully'));
  // }

  return (
    <form onSubmit={handleEmailSubmission}>
      <input
        type='text'
        onChange={(e) => setUserEmail(e.target.value)}
        value={userEmail}
        placeholder='enter your email'
      />
      <button className='button' type='submit'>
        get image via email
      </button>
    </form>
  );
};

const ImageGrid = ({ allImages, setImage }) => {
  const URL = 'http://localhost:3030';
  const imageClick = (e) => {
    setImage(e.target.src);
  };
  return (
    <div className='allImageGrid'>
      {allImages.map((image, i) => (
        <img key={i} src={`${URL}/${image}`} alt='' onClick={imageClick} />
      ))}
    </div>
  );
};

export default UI;
