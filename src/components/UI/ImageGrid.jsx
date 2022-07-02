import { useEffect, useState, useCallback } from 'react';

const ImageGrid = ({ setImage, socket, allImg, image, setVid, SERVER_URL }) => {
  const [curData, setCurData] = useState([]);
  // let object;

  const imageClick = (e) => {
    const element = e.target;
    const obj = allImg.find(
      (item) => item.name === element.getAttribute('data-name')
    );
    // console.log(obj);
    setCurData(obj);
    socket.emit('get_file', { Key: obj.fileAddr });
  };

  const handleFile = useCallback(
    ({ Data }) => {
      setImage({ ...curData, Data });
      setVid(true);
    },
    [curData, setImage, setVid]
  );

  useEffect(() => {
    socket.off('get_file').on('get_file', handleFile);
  }, [socket, handleFile]);

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
            // src={`${SERVER_URL}${data.thumbnailUrl}`}
            data-name={data.name}
            src={`data:image/jpeg;base64,` + data.thumb}
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
