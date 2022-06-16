const ImageGrid = ({ allImages, setImage, image, setVid, SERVER_URL }) => {
  const imageClick = (e) => {
    // console.log(e.target);
    // const i = e.target.querySelector('img').src;
    // console.log(image);

    const i = e.target.src;
    // console.log(image, i);
    const curImg = document.querySelector('#image');
    if (image === i) {
      // console.log(e.target);
      setImage('');
      curImg.style.display = 'none';
      return;
    }
    curImg.style.display = 'block';
    setImage(e.target.src);
    setVid(true);
  };
  return (
    <div className='allImageGrid h-1/2 md:h-full overflow-y-scroll w-full flex justify-center gap-2 flex-wrap p-5 '>
      {allImages.map((data, i) => (
        <img
          key={i}
          src={`${SERVER_URL}/${data.link}`}
          alt=''
          onClick={imageClick}
          className='gridImg w-1/5'
        />
      ))}
    </div>
  );
};

export default ImageGrid;
