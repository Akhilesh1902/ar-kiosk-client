import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import DeleteImagePanel from './DeleteImagePanel';
import NewImagePanel from './NewImagePanel';

const Dashnboard = ({ socket, SERVER_URL, setLogin }) => {
  const { subpath } = useParams();

  return (
    <div className='overflow-hidden main bg-slate text-gray h-screen flex flex-col'>
      <nav className='flex justify-between py-3 items-center px-5 bg-mid'>
        <h1 className='font-bold text-text'>AR-Kiosk Dash</h1>
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
        </section>
        <section className='right-section p-4 h-screen w-full'>
          {subpath === 'newimage' && <NewImagePanel socket={socket} />}
          {subpath === 'deleteimage' && (
            <DeleteImagePanel SERVER_URL={SERVER_URL} socket={socket} />
          )}
          {subpath === undefined && (
            <>
              <h1 className='font-bold text-lg'>This is dash </h1>
              <p>Select Your options from the left panel</p>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashnboard;
