import React, { useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import ArrangeImages from './ArrangeImages';
import DeleteImagePanel from './DeleteImagePanel';
import Modal from './Modal';
import NewImagePanel from './NewImagePanel';

const Dashnboard = ({ socket, SERVER_URL, setLogin }) => {
  const { subpath } = useParams();
  const [type, setType] = useState(null);

  return (
    <div className='overflow-hidden main bg-slate text-gray h-screen flex flex-col'>
      <nav className='flex justify-between py-3 items-center px-5 bg-mid'>
        <Link to='/' className='font-bold text-text'>
          AR-Kiosk Dash
        </Link>
        <button
          className='bg-accent rounded p-1 px-3 text-sm text-text'
          onClick={() => {
            setLogin(false);
          }}>
          Log-Out
        </button>
      </nav>
      <div className='flex gap-2 h-full'>
        <section className='left-section bg-mid py-4 text-text h-full font-bold w-1/5 flex flex-col gap-2 items-center justify-start '>
          <NavLink to={'/admin'} className='!text-text mb-4'>
            Dash
          </NavLink>
          <NavLink to={'/admin/newimage'} className='text-text'>
            Insert New Image
          </NavLink>
          <NavLink to={'/admin/deleteimage'} className='text-text'>
            Delete Image
          </NavLink>
          <NavLink to={'/admin/arrangeimages'} className='text-text'>
            Arrange Images
          </NavLink>
        </section>
        <section className='right-section p-4 h-screen w-full'>
          {subpath === 'newimage' && (
            <NewImagePanel type={type} setType={setType} socket={socket} />
          )}
          {subpath === 'deleteimage' && (
            <DeleteImagePanel
              SERVER_URL={SERVER_URL}
              type={type}
              setType={setType}
              socket={socket}
            />
          )}
          {subpath === 'arrangeimages' && (
            <ArrangeImages SERVER_URL={SERVER_URL} socket={socket} />
          )}
          {subpath === undefined && (
            <>
              <h1 className='font-bold text-lg'>This is dash </h1>
              <p>Select Your options from the left panel</p>
            </>
          )}
          {type ? <Modal /> : null}
        </section>
      </div>
    </div>
  );
};

export default Dashnboard;
