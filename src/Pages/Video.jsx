import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// I need to use useLazy.js, hook to fetch data with paginataion
// The limit is already set at 10
import useLazy from '../utils/hooks/useLazy';

// The loading is actually really long, I don't really know if I can improve that or if it come from server
function Video() {
  const [videoTable, setVideoTable] = useState([]);
  const usePersonalizedHook = useLazy();
  useEffect(() => {
    const { data } = usePersonalizedHook;
    setVideoTable(data);
  }, []);
  console.log(videoTable);
  const videoList = videoTable.map((videos) => {
    return (
      <Link
        to={{
          pathname: '/videoDetails',
          state: { videos },
        }}>
        <tr>
          <td>{videos.name}</td>
          <td>{videos.status}</td>
          <td>{videos.publicationDate}</td>
        </tr>
      </Link>
    );
  });
  return <table>{videoList}</table>;
}

export default Video;
