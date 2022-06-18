import React, { useState, useEffect } from 'react';

const DeleteImagePanel = ({ socket, SERVER_URL, setType, type }) => {
  const [imgArr, setImgArr] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
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
      // eslint-disable-next-line
    };
    socket.on('images_updated', () => {
      fetchImages();
    });
    fetchImages();
    return () => {
      socket.off('images_updated', () => {});
    };

    // eslint-disable-next-line
  }, []);

  const handleImageClick = (e) => {
    const clickedImg = imgArr.find((img) => img.link === e.target.src);
    if (window.confirm(`Confirm Delete?\nImage : ${clickedImg.name}`)) {
      socket.emit('__delete_image', { img: clickedImg });
    }
  };

  return (
    <div className='flex flex-col h-full '>
      <h1 className='py-2 '>Click on Image to delete from server</h1>
      <div className='flex img_container content-start justify-start items-start flex-wrap h-full'>
        {imgArr.map((data, i) => {
          return (
            <div key={i} className='w-24 mr-1 h-24'>
              <img
                className='w-24 h-full rounded border border-dark'
                src={data.link}
                alt=''
                onClick={handleImageClick}
              />
            </div>
          );
        })}
        {/* <Modal type={type} /> */}
      </div>
    </div>
  );
};

export default DeleteImagePanel;
