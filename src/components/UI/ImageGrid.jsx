import { useModelStore } from '../../Store/ModelStore';
import { useState } from 'react';

const ImageGrid = ({ setImage, allImg, image, setVid, SERVER_URL }) => {
  const setCurentModelUrl = useModelStore((state) => state.setCurentModelUrl);
  const [loadingImage, setLoadingImage] = useState(false);
  const blobUrlMaker = (data) => {
    const arrbuff = new Uint8Array(data);
    const blob = new Blob([arrbuff]);
    const urlCreator = window.URL || window.webkitURL;
    const url = urlCreator.createObjectURL(blob);
    return url;
  };

  const imageClick = async (e) => {
    setLoadingImage(true);
    const curData = allImg.find(
      (item) => item.name === e.target.getAttribute('data-name')
    );
    if (curData.type === 'model') {
      const resp = await fetch(`${SERVER_URL}/model/${curData.name}`);
      const data = await resp.json();
      const url = blobUrlMaker(data.model.data);
      setCurentModelUrl(url);
      setImage(curData);
    } else {
      const resp = await fetch(`${SERVER_URL}/file/${curData.name}`);
      const data = await resp.json();
      const url = blobUrlMaker(data.model.data);
      setImage({ ...curData, url: url });
    }
    setLoadingImage(false);
    setVid(true);
  };
  if (loadingImage) return <p>Loading your selected image or model</p>;
  return (
    <div className='allImageGrid h-1/2 md:h-full overflow-y-scroll w-full flex justify-center content-start gap-2 flex-wrap p-5 mt-2  '>
      {allImg.map((item, i) => (
        <div
          className='w-24 mr-1 h-24 bg-accent'
          style={{
            clipPath:
              'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            padding: '2px',
          }}
          key={item._id || item.name}>
          <img
            data-name={item.name}
            src={`data:image/jpeg;base64,${item.thumb}`}
            alt=''
            onClick={imageClick}
            style={{
              clipPath:
                'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            }}
            className='gridImg w-24 object-cover object-top h-full bg-dark '
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
