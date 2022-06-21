const ImageGrid = ({ setImage, allImg, image, setVid, SERVER_URL }) => {
  const imageClick = (e) => {
    const i = e.target.src;
    const curImg = document.querySelector('#image');
    const curImgData = allImg.find(
      (data) => data.url === `/static${i.split('static')[1]}`
    );
    if (image === i) {
      setImage('');
      curImg.style.display = 'none';
      return;
    }
    curImg.style.display = 'block';
    setImage(curImgData);
    setVid(true);
  };
  return (
    <div className='allImageGrid h-1/2 md:h-full overflow-y-scroll w-full flex justify-center content-start gap-2 flex-wrap p-5 '>
      {allImg.map((data, i) => (
        <div className='w-24 mr-1 h-24' key={data._id || data.name}>
          <img
            src={`${SERVER_URL}${data.url}`}
            alt=''
            onClick={imageClick}
            className='gridImg w-24 object-cover object-top h-full rounded bg-dark'
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
