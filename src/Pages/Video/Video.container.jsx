import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { VideoAPI } from '../../utils/api/api';
import VideoView from './Video.view';

function VideoContainer() {
  const history = useHistory();
  const [videos, setVideos] = useState();
  const [idVideo, setIdVideo] = useState(undefined);

  let video = [];

  if (idVideo !== undefined) {
    history.push('video-details');
  }

  if (idVideo !== undefined) {
    video = videos.filter((video) => idVideo === video.id).map((video) => video);
  }
  // eslint-disable-next-line no-console
  console.log(video);
  useEffect(() => {
    VideoAPI.findAll({
      limit: 10,
    }).then((response) => {
      setVideos(response.items);
    });
  }, []);

  return (
    <div>
      <VideoView videos={videos} setIdVideo={setIdVideo} />
    </div>
  );
}

export default VideoContainer;
