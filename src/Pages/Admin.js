import React, { useRef, useState } from 'react';

const Admin = ({ socket, SERVER_URL }) => {
  const image_input_ref = useRef();
  const image_display_ref = useRef();
  const image_name_ref = useRef();
  // const image_name_input = document.querySelector('.image_name_input');

  const [selectedFile, setSelectedFile] = useState(null);
  const onFileCange = (e) => {
    console.log(e.target.files);
    setSelectedFile(e.target.files[0]);

    const IURL = URL.createObjectURL(e.target.files[0]);
    image_display_ref.current.style.backgroundImage = `url(${IURL})`;
  };

  const form_ref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const ext = ['jpg', 'jpeg', 'png'];

    const curExt = image_name_ref.current.value.split('.').pop();

    if (!ext.includes(curExt)) {
      console.log('wrong extension');
      return;
    }

    // console.log();
    console.log(selectedFile.name);

    socket.emit('_new_image_upload', {
      imageName: image_name_ref.current.value,
      image: selectedFile,
    });
    console.log('iamge submitted');
  };
  return (
    <div className='main bg-slate text-gray flex gap-2'>
      <section className='left-section bg-amber h-screen font-bold w-1/5 flex justify-center'>
        <h1 className='mt-4'>Ar-Kiosk</h1>
      </section>
      <section className='right-section pl-4 h-screen w-full'>
        <div>
          <h1 className='mt-4 font-medium'>Admin Panel</h1>
          <div className='pt-4'>
            <h2 className='underline decoration-double '>
              Add more Images to Kiosk
            </h2>
            <form
              ref={form_ref}
              onSubmit={handleSubmit}
              className='image-form w-max flex  flex-col gap-3 mt-4'>
              <input
                ref={image_name_ref}
                type='text'
                placeholder='Enter image name with extension'
                className='p-1 px-2 self-start'
              />
              <input
                ref={image_input_ref}
                type='file'
                id='image-input'
                accept='image/jpeg, image/png,image/jpg'
                required
                onChange={onFileCange}
              />

              <div
                id='display-image'
                ref={image_display_ref}
                className='w-full bg-dark bg-center bg-cover rounded aspect-video'></div>
              <button
                type='submit'
                className='bg-lime w-fit px-4 py-1 rounded-md'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admin;
