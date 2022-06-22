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
    <div className='allImageGrid h-1/2 md:h-full overflow-y-scroll w-full flex justify-center content-start gap-2 flex-wrap p-5 mt-2  '>
      {allImg.map((data, i) => (
        <div
          className='w-24 mr-1 h-24 bg-accent'
          style={{
            clipPath:
              'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            padding: '2px',
          }}
          key={data._id || data.name}>
          <img
            src={`${SERVER_URL}${data.url}`}
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
