import React, { useState } from 'react';
import { AiFillCamera, AiFillVideoCamera } from 'react-icons/ai';
import html2canvas from 'html2canvas';
import EmailModal from './UI/EmailModal';
import ImageGrid from './UI/ImageGrid';
import { useGetImageArray } from './utils/utils';

const UI = (props) => {
  // const [userInput, setUserInput] = useState('');

  const { setImage, setVid, image, socket, vid, SERVER_URL, edit, setEdit } =
    props;

  const [screenShot, setScreenShot] = useState();
  const [pCanvas, setPCanvas] = useState(false);
  const [modal, setModal] = useState(false);

  const [allImg] = useGetImageArray(SERVER_URL, socket);

  let capTimeOut;

  const handleCapture = async () => {
    if (!vid) {
      alert('turn on video');
      return;
    }

    if (edit.edit) {
      alert('still editing');
      return;
    }

    if (capTimeOut) return;

    const app = document.querySelector('.App');
    const timerP = document.querySelector('.timerP');
    timerP.innerText = '1';

    app.appendChild(timerP);

    const testINT = setInterval(() => {
      if (parseInt(timerP.innerText) < 3) {
        timerP.innerText = (parseInt(timerP.innerText) + 1).toString();
      } else {
        timerP.innerText = 'Clicking';
      }
      // if (parseInt(timerP.innerText) >= 3) {
      //   return;
      // }
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
    }, 3000);
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

  const handleEdit = () => {
    setEdit((prev) => ({ ...prev, edit: !edit.edit }));
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
          className='flex-col h-5/6 items-center justify-center'>
          <h1 className='font-bold pt-3 text-accent text-3xl  self-start '>
            AR KIOSK
          </h1>
          <h1 className='font-bold text-text  self-start '>
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
              className='bg-accent px-2 py-1 rounded text-dark font-medium text-xs'
              onClick={handleRetake}>
              Retake
            </button>
            <button
              className='bg-mid px-2 py-1 rounded text-text font-medium text-xs'
              onClick={handleImageDelevery}>
              Get Image
            </button>
          </div>
        ) : null}
      </div>
      {vid && !pCanvas ? (
        <div
          className={`button-container z-30 flex gap-5 justify-self-end absolute bottom-0 p-2 px-4 rounded text-text font-bold text-xs ${
            !vid ? '' : ' glass'
          }`}>
          <button
            className='flex  flex-col  items-center gap-0'
            onClick={() => {
              setImage('');
              setVid(!vid);
            }}>
            <AiFillVideoCamera className='text-3xl text-dark' />
            Exit Video
          </button>
          <button
            onClick={handleCapture}
            className='flex text-text font-bold flex-col text-xs items-center gap-0'>
            <AiFillCamera className='text-3xl text-accent' />
            Capture Image
          </button>
          <button
            onClick={handleEdit}
            className='flex text-text font-bold flex-col text-xs items-center gap-0'>
            <AiFillCamera className='text-3xl text-accent' />
            Edit Img
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default UI;
