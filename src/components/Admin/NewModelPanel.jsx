import { useRef, useState, useEffect } from 'react';
import Modal from './Modal';
import CanvasWrapper from '../../ThreeJS/CanvasWrapper';
import { useModelStore } from '../../Store/ModelStore';
import 'react-dropdown/style.css';

const NewModel = ({ socket }) => {
  const setCurentModelUrl = useModelStore((state) => state.setCurentModelUrl);

  const image_input_ref = useRef();
  const [modal, setModal] = useState();
  const thumbRef = useRef();
  const mtl_input = useRef();
  const modelInputRef = useRef();
  const [modelData, setModelData] = useState({
    thumbName: '',
    thumb: null,
    file: null,
    name: '',
    DisplayName: '',
    Class: '',
    Subject: '',
    Topic: '',
    animations: [],
    material: null,
    scale: 1,
  });
  const [modelProps, setModelProps] = useState({
    curAnimIndex: 0,
    rotation: { x: 0, y: 0, z: 0 },
    autoRotate: false,
    scale: 1,
    orbitControls: false,
    material: null,
  });

  useEffect(() => {
    console.log(modelData);
  }, [modelData]);

  socket.off('model_received').on('model_received', ({ msg }) => {
    // console.log(msg);
    alert('Model Uploaded in server');
    setModelData({
      thumbName: '',
      thumb: null,
      file: null,
      name: '',
      animations: [],
      scale: 1,
    });
    setModelProps({
      curAnimIndex: 0,
      rotation: { x: 0, y: 0, z: 0 },
      autoRotate: false,
      scale: 1,
      orbitControls: false,
      material: null,
    });
    image_input_ref.current.value = null;
    modelInputRef.current.value = null;
    mtl_input.current.value = null;
    setCurentModelUrl('');
    thumbRef.current.style.backgroundImage = null;
  });

  const onFileChange = (e) => {
    console.log(e.target.id);
    if (e.target.id === 'thumbnail-input') {
      const file = e.target.files[0];

      const IURL = URL.createObjectURL(file);
      thumbRef.current.style.backgroundImage = `url(${IURL})`;
      const thumbName = file.name.replace(/ /g, '_');
      setModelData({ ...modelData, thumbName, thumb: file });
    } else {
      const file = e.target.files[0];
      const IURL = URL.createObjectURL(file);
      setCurentModelUrl(IURL);
      const name = file.name.replace(/ /g, '_');
      if (!name.includes('.glb')) {
        console.log(name.split('.')[1]);
        setModelData({ ...modelData, loader: name.split('.')[1] });
      }
      setModelData({ ...modelData, name, file });
      // console.log(name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(modal);
    console.log('here');
    socket.emit('_add_model', {
      modelData: { ...modelData, animations: null, type: 'model' },
    });
    setModal(false);
  };

  return (
    <div className='flex flex-col text-text'>
      <h1 className='mt-4 font-medium text-xl text-dark'>
        Add More Model To App
      </h1>
      <div className='pt-4'>
        <form
          onSubmit={(e) => {
            console.log('here');
            e.preventDefault();
            setModal(true);
          }}
          className='image-form w-full flex flex-col gap-3 mt-4'>
          <div className='flex w-full justify-between gap-3 text-dark'>
            <div className='flex  flex-col gap-3'>
              <div>
                <p>Add Thumbnail</p>
                <div className='flex'>
                  <div
                    ref={thumbRef}
                    className='bg-accent w-20 h-20 !bg-cover mr-3 !bg-top'></div>
                  <input
                    ref={image_input_ref}
                    type='file'
                    id='thumbnail-input'
                    accept='image/jpeg, image/png,image/jpg,.mp4'
                    required
                    onChange={onFileChange}
                  />
                </div>
              </div>
              <div className='flex flex-col'>
                <p>Add Model</p>
                <input
                  ref={modelInputRef}
                  type='file'
                  id='model-input'
                  accept='.glb'
                  required
                  onChange={onFileChange}
                />
                <span className='p-0 m-0 leading-none ml-2 text-xs  italic'>
                  max-size:12mb
                </span>
              </div>
              <div className='h-full w-3/4 aspect-video border border-accent'>
                <CanvasWrapper />
              </div>
            </div>
            <div className='flex w-1/3 flex-col'>
              <h1>Add Additional Data</h1>
              <div className=' flex flex-col gap-2'>
                <div className=' flex flex-col gap-1'>
                  <p>Model Name :</p>
                  <input
                    type='text'
                    required
                    value={modelData.DisplayName}
                    onChange={(e) => {
                      setModelData({
                        ...modelData,
                        DisplayName: e.target.value,
                      });
                    }}
                    className='rounded text-dark px-2 py-1 outline-0'
                  />
                </div>
                <div className=' flex flex-col gap-1'>
                  <p>Scale:</p>
                  <input
                    className='rounded text-dark px-2 py-1 outline-0'
                    type='number'
                    value={modelProps.scale}
                    onChange={(e) => {
                      setModelProps((p) => ({ ...p, scale: e.target.value }));
                      setModelData((p) => ({ ...p, scale: e.target.value }));
                    }}
                  />
                </div>
                <div className='flex flex-col w-full gap-2'>
                  <p>Select Animations :</p>
                  <div className='flex gap-2 flex-wrap w-full'>
                    {modelData.animations.map((item, i) => {
                      return (
                        <button
                          type='button'
                          className='px-2 bg-mid text-dark'
                          onClick={(e) => {
                            setModelProps((md) => ({
                              ...md,
                              curAnimIndex: parseInt(e.target.innerText),
                            }));
                          }}>
                          {i}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button type='submit' className='bg-lime w-fit px-4 py-1 rounded-md'>
            Submit
          </button>
        </form>
        {modal && (
          <Modal
            type='Add New Modal'
            setModal={setModal}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default NewModel;
