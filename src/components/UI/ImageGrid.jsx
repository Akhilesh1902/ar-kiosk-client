const ImageGrid = ({ setImage, allImg, image, setVid, SERVER_URL }) => {
  console.log(allImg);
  console.log(SERVER_URL);
  const imageClick = (e) => {
    const i = e.target.src;
    const curImg = document.querySelector('#image');
    if (image === i) {
      setImage('');
      curImg.style.display = 'none';
      return;
    }
    curImg.style.display = 'block';
    setImage(e.target.src);
    setVid(true);
  };
  return (
    <div className='allImageGrid h-1/2 md:h-full overflow-y-scroll w-full flex justify-center content-start gap-2 flex-wrap p-5 '>
      {allImg.map((data, i) => {
        console.log(data);
        console.log(`${SERVER_URL}${data.url}`);
        return (
          <div className='w-24 mr-1 h-24' key={data._id}>
            <img
              src={`${SERVER_URL}${data.url}`}
              alt=''
              onClick={imageClick}
              className='gridImg w-24 h-full rounded border border-dark'
            />
          </div>
        );
      })}
    </div>
  );
};

export default ImageGrid;
