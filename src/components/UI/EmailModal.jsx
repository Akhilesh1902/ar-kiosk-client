import { useState } from 'react';

const EmailModal = ({ screenShot, setPCanvas, setModal, socket }) => {
  const [userEmail, setUserEmail] = useState('');
  const handleEmailSubmission = (e) => {
    e.preventDefault();
    if (!userEmail.includes('@')) {
      alert('invalid email');
      return;
    }
    alert(`sending mail to : ${userEmail} `);
    // use smtpjs to send emails
    socket.emit('send_image', { screenShot, userEmail });
    setModal(false);
    setPCanvas(null);
  };
  return (
    <form onSubmit={handleEmailSubmission}>
      <input
        type='text'
        onChange={(e) => setUserEmail(e.target.value)}
        value={userEmail}
        className='outline-0'
        placeholder='Enter your email'
      />
      <button
        className='bg-mid my-2 px-2 py-1 rounded text-text font-medium text-xs'
        type='submit'>
        Get Image Via Mail
      </button>
    </form>
  );
};

export default EmailModal;
