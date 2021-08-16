import React, { useState, useEffect } from 'react';
// I need to use useLazy.js, hook to fetch data with paginataion
// The limit is already set at 10
import useLazy from '../utils/hooks/useLazy';

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
      <li key={videos.name}>
        {videos.name}, {videos.status}, {videos.publicationDate}
      </li>
    );
  });
  return <ul>{videoList}</ul>;
}

export default Video;
