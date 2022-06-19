import { useEffect, useState } from 'react';

export const useGetImageArray = (SERVER_URL, socket) => {
  const [imgArr, setImgArr] = useState([]);

  const fetchImages = async () => {
    let _imgURL = `${SERVER_URL}/images`;

    const res = await fetch(_imgURL);
    const data = await res.json();

    console.log(data);

    // let linkArr = [];
    // data.forEach((d) => {
    //   linkArr.push({
    //     name: d.name,
    //     link: `${SERVER_URL}/${d.link}`,
    //   });
    // });
    setImgArr(data);
    // eslint-disable-next-line
  };
  useEffect(() => {
    socket.on('images_updated', () => {
      fetchImages();
    });
    fetchImages();
    return () => {
      socket.off('images_updated', () => {});
    };

    // eslint-disable-next-line
  }, []);
  const reloadImageArray = () => {
    fetchImages();
  };
  return [imgArr, reloadImageArray];
};
