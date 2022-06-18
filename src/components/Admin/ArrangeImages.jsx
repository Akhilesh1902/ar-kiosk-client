import React, { useState, useEffect } from 'react';

const ArrangeImages = ({ socket, SERVER_URL }) => {
  const [imgArr, setImgArr] = useState([]);
  const [selected, setSelected] = useState('');

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
    // console.log(selected);
    // console.log(e.target.src);
    if (selected) {
      console.log(imgArr);
      //   console.log(arr);
      const f = imgArr.find((i) => i.link === selected);
      const s = imgArr.find((i) => i.link === e.target.src);

      const i = imgArr.indexOf(f);
      const j = imgArr.indexOf(s);

      let a = imgArr[i];

      imgArr[i] = imgArr[j];
      imgArr[j] = a;
      setSelected('');
      socket.emit('img_rearranged', { imgArr });
      return;
    }
    setSelected(e.target.src);
  };

  return (
    <div className='flex flex-col h-full '>
      <h1 className='py-2 '>Click on two Images to swap</h1>
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

export default ArrangeImages;
