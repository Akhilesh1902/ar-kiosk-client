import React, { useRef, useState } from 'react';

const NewImagePanel = ({ socket }) => {
  const image_input_ref = useRef();
  const image_display_ref = useRef();
  const image_name_ref = useRef();
  const form_ref = useRef();

  const [selectedFile, setSelectedFile] = useState(null);

  const onFileCange = (e) => {
    console.log(e.target.files);
    setSelectedFile(e.target.files[0]);

    const IURL = URL.createObjectURL(e.target.files[0]);
    image_display_ref.current.style.backgroundImage = `url(${IURL})`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ext = ['jpg', 'jpeg', 'png'];
    const curExt = image_name_ref.current.value.split('.').pop();
    if (!ext.includes(curExt)) {
      console.log('wrong extension');
      return;
    }
    socket.emit('_new_image_upload', {
      imageName: image_name_ref.current.value,
      image: selectedFile,
    });
  };
  return (
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
          <button type='submit' className='bg-lime w-fit px-4 py-1 rounded-md'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewImagePanel;
