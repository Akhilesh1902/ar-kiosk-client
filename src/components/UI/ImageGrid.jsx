import { useModelStore } from '../../Store/ModelStore';

const ImageGrid = ({ setImage, allImg, image, setVid, SERVER_URL }) => {
  const setCurentModelUrl = useModelStore((state) => state.setCurentModelUrl);

  console.log(allImg);
  const imageClick = async (e) => {
    console.log(e.target.getAttribute('data-name'));
    const curData = allImg.find(
      (item) => item.name === e.target.getAttribute('data-name')
    );
    if (curData.type === 'model') {
      console.log('fetching model');
      const resp = await fetch(`${SERVER_URL}/model/${curData.name}`);
      const data = await resp.json();
      console.log({ data });

      const arrbuff = new Uint8Array(data.model.data);
      const blob = new Blob([arrbuff]);
      const urlCreator = window.URL || window.webkitURL;
      const url = urlCreator.createObjectURL(blob);
      console.log(url);
      setCurentModelUrl(url);
      setImage(curData);

      console.log(data);
    } else {
      const resp = await fetch(`${SERVER_URL}/file/${curData.name}`);
      const data = await resp.json();
      console.log(data);
      console.log({ curData });
      const arrbuff = new Uint8Array(data.model.data);
      const blob = new Blob([arrbuff]);
      const urlCreator = window.URL || window.webkitURL;
      const url = urlCreator.createObjectURL(blob);
      setImage({ ...curData, url: url });
    }
    // const curImg = document.querySelector('#image');
    // const curImgData = allImg.find(
    //   (data) => data.thumbnailUrl === `/static${i.split('static')[1]}`
    // );

    // console.log(curImgData);
    // setImage(curData);
    setVid(true);
  };
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
