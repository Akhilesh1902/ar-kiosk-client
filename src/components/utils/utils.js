import { useEffect, useState } from 'react';
export const useGetImageArray = (SERVER_URL, socket) => {
  const [imgArr, setImgArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchImages = async () => {
    let _imgURL = `${SERVER_URL}/images`;
    const res = await fetch(_imgURL);
    if (res.status !== 200) setError(true);
    const data = await res.json();
    if (data.length) setLoading(false);
    setImgArr(data);
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
  return [imgArr, loading, error, reloadImageArray];
};
