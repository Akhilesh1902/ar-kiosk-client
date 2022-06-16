import React, { useState, useEffect } from 'react';

const DeleteImagePanel = ({ socket, SERVER_URL }) => {
  const [imgArr, setImgArr] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      console.log('here');
      let _imgURL = `${SERVER_URL}/images`;

      const res = await fetch(_imgURL);
      const data = await res.json();
      let linkArr = [];
      data.forEach((d) => {
        linkArr.push({
          name: d.name,
          link: `${SERVER_URL}/${d.link}`,
        });
      });
      setImgArr(linkArr);
      console.log(linkArr);
      console.log(imgArr);
      // eslint-disable-next-line
    };
    socket.on('images_updated', () => {
      fetchImages();
    });
    fetchImages();
    return () => {
      socket.off('images_updated', () => {
        console.log('new IMgae');
      });
    };

    // eslint-disable-next-line
  }, []);

  const handleImageClick = (e) => {
    const clickedImg = imgArr.find((img) => img.link === e.target.src);
    socket.emit('__delete_image', { img: clickedImg });
  };

  return (
    <div className='flex flex-col h-full '>
      <h1 className='py-2 '>Click on Image to delete from server</h1>
      <div className='flex img_container content-start justify-start items-start flex-wrap h-full'>
        {imgArr.map((data, i) => {
          return (
            <div className='w-24 mr-1 h-24'>
              <img
                className='w-24 h-full rounded border border-dark'
                key={i}
                src={data.link}
                alt=''
                onClick={handleImageClick}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeleteImagePanel;
