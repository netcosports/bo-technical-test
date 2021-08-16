import React from 'react';
import { useLocation } from 'react-router-dom';
import { loginImagePath, legalText } from '../../config';
import { palette } from '../../muiTheme';
import styles from './videoDetails.module.scss';
import OutlinedTextField from '../../widgets/OutlinedTextField/OutlinedTextField';
import DatePickers from '../../widgets/DatePickers/DatePickers';
import CheckBox from '../../widgets/CheckBox/CheckBox';
import noImage from './noImage.png';

const backGroundStyle = loginImagePath
  ? { backgroundImage: `url(${loginImagePath})` }
  : { backgroundColor: palette.primary.main };

function VideoDetails() {
  const location = useLocation();
  const { videos } = location.state;
  console.log(videos);
  return (
    <div className={styles.loginWrapper} style={backGroundStyle}>
      <div className={styles.form}>
        <div>
          <p>name</p>
          <OutlinedTextField value={videos.name} />
        </div>
        <p>Description</p>
        <div>
          <OutlinedTextField value={videos.description ? videos.description : 'No description'} />
        </div>
        <div>
          <p>Publication date</p>
          <DatePickers value="test" />
        </div>
        <p>Public or private</p>
        <div>
          <CheckBox value={videos.visibility} label={videos.visibility} checked />
        </div>
        <p>Poster</p>
        <div>
          <img src={videos.poster ? videos.poster : noImage} alt="poster" />
        </div>
      </div>
      <div className={styles.copyrightText}>{legalText}</div>
    </div>
  );
}

export default VideoDetails;
