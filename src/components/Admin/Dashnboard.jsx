import React from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import ArrangeImages from './ArrangeImages';
import DeleteImagePanel from './DeleteImagePanel';
// import Modal from './Modal';
import NewImagePanel from './NewImagePanel';
import NewVideoPanel from './NewVideoPanel';

const Dashnboard = ({ socket, SERVER_URL, setLogin }) => {
  const { subpath } = useParams();

  return (
    <div className='overflow-hidden main bg-slate text-gray h-screen flex flex-col'>
      <nav className='flex justify-between py-3 items-center px-5 bg-purple'>
        <Link to='/' className='font-bold text-accent'>
          <img src='/logo3.png' className='w-16 ml-4' alt='Tutar Logo' />
        </Link>
        <button
          className='bg-mid rounded p-1 px-3 text-sm text-purple'
          onClick={() => {
            setLogin(false);
          }}>
          Log-Out
        </button>
      </nav>
      <div className='flex gap-2 h-full'>
        <section className='text-accent left-section bg-purple py-4 text-text h-full font-bold w-1/5 flex flex-col gap-4 items-center justify-start '>
          <NavLink to={'/admin'} className='!text-accent mb-4'>
            Dash
          </NavLink>
          <NavLink to={'/admin/newimage'} className='text-accent'>
            Insert New Image
          </NavLink>
          <NavLink to={'/admin/newvideo'} className='text-accent'>
            Insert New Video
          </NavLink>
          <NavLink to={'/admin/deleteimage'} className='text-accent'>
            Delete Image
          </NavLink>
          <NavLink to={'/admin/arrangeimages'} className='text-accent'>
            Arrange Images
          </NavLink>
        </section>
        <section className='right-section p-4 h-full w-full'>
          {subpath === 'newimage' && (
            <NewImagePanel SERVER_URL={SERVER_URL} socket={socket} />
          )}
          {subpath === 'deleteimage' && (
            <DeleteImagePanel SERVER_URL={SERVER_URL} socket={socket} />
          )}
          {subpath === 'arrangeimages' && (
            <ArrangeImages SERVER_URL={SERVER_URL} socket={socket} />
          )}

          {subpath === 'newvideo' && (
            <NewVideoPanel SERVER_URL={SERVER_URL} socket={socket} />
          )}
          {subpath === undefined && (
            <>
              <h1 className='font-bold text-lg'>This is dash </h1>
              <p>Select Your options from the left panel</p>
            </>
          )}
          {/* {type ? <Modal /> : null} */}
        </section>
      </div>
    </div>
  );
};

export default Dashnboard;
