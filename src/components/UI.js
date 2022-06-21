import React, { useState } from 'react';
import { AiFillCamera, AiFillVideoCamera } from 'react-icons/ai';
import html2canvas from 'html2canvas';
import EmailModal from './UI/EmailModal';
import ImageGrid from './UI/ImageGrid';
import { useGetImageArray } from './utils/utils';

const UI = (props) => {
  // const [userInput, setUserInput] = useState('');

  const { setImage, setVid, image, socket, vid, SERVER_URL } = props;

  const [screenShot, setScreenShot] = useState();
  const [pCanvas, setPCanvas] = useState(false);
  const [modal, setModal] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [allImg] = useGetImageArray(SERVER_URL, socket);

  let capTimeOut;

  const handleCapture = async () => {
    if (capTimeOut) return;

    const app = document.querySelector('.App');
    const timerP = document.querySelector('.timerP');
    timerP.innerText = '5';

    app.appendChild(timerP);

    const testINT = setInterval(() => {
      if (parseInt(timerP.innerText) > 1) {
        timerP.innerText = (parseInt(timerP.innerText) - 1).toString();
      } else {
        timerP.innerText = 'Smile Please';
      }
    }, 1000);

    // setModal(true);
    capTimeOut = setTimeout(async () => {
      const poto = document.querySelector('.videoContainer');
      const canvas = await html2canvas(poto, {
        allowTaint: true,
        useCORS: true,
      });

      // displayImageToUser(canvas);
      setPCanvas(canvas);
      document.querySelector('.previewCanvasContainer').appendChild(canvas);
      timerP.innerText = '';
      clearInterval(testINT);
      capTimeOut = null;
      setCapturing(false);
    }, 5000);
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
    <div
      id='uiContainer'
      className={`uiContainer  flex flex-col absolute h-4/5 justify-center items-center w-1/2 bg-dark rounded pb-4 ${
        vid ? 'bg-transparent ' : 'z-20 glass'
      }`}>
      {modal ? (
        <EmailModal
          screenShot={screenShot}
          setPCanvas={setPCanvas}
          setModal={setModal}
          socket={socket}
        />
      ) : null}
      {!vid ? (
        <div
          style={{ display: vid ? 'none' : 'flex' }}
          className='flex-col h-5/6 items-center px-5 justify-center'>
          {/* <h1 className='font-bold pt-3 text-accent text-3xl  self-start '>
            AR KIOSK
          </h1> */}
          <img
            src='/logo.png'
            alt='TUTAR KIOSK'
            className='h-10 self-start bg-accent p-1'
          />
          <h1 className='kiosk-heading font-bold text-purple self-start '>
            Select a Photo To Interact
          </h1>
          <ImageGrid
            setVid={setVid}
            // allImages={allImages}
            allImg={allImg}
            SERVER_URL={SERVER_URL}
            setImage={setImage}
            image={image}
          />
        </div>
      ) : null}
      <div
        className='previewCanvasContainer z-20   '
        style={{ border: pCanvas && !modal ? '1px solid #c2968a' : 'none' }}>
        {pCanvas && !modal ? (
          <div className='UI justify-self-end self-end'>
            <button
              className='bg-mid px-2 py-1 rounded text-dark font-medium text-xs'
              onClick={handleRetake}>
              Retake
            </button>
            <button
              className='bg-accent px-2 py-1 rounded text-purple font-medium text-xs'
              onClick={handleImageDelevery}>
              Get Image
            </button>
          </div>
        ) : null}
      </div>
      {vid && !pCanvas && !capturing ? (
        <div
          className={`button-container z-30 flex gap-5 p-2 px-4 rounded text-text font-bold text-xs ${
            !vid ? '' : ' glass'
          }`}>
          <button
            className='flex  flex-col  items-center gap-0'
            onClick={() => {
              setImage('');
              setVid(!vid);
            }}>
            <AiFillVideoCamera className='text-3xl text-mid' />
            Exit Video
          </button>
          <button
            onClick={() => {
              setCapturing(true);
              handleCapture();
            }}
            className='flex text-text font-bold flex-col text-xs items-center gap-0'>
            <AiFillCamera className='text-3xl text-accent' />
            Capture Image
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default UI;
