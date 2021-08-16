import React from 'react';
import { loginImagePath, legalText } from '../../config';
import { palette } from '../../muiTheme';
import styles from './videoDetails.module.scss';
import OutlinedTextField from '../../widgets/OutlinedTextField/OutlinedTextField';
import DatePickers from '../../widgets/DatePickers/DatePickers';
import CheckBox from '../../widgets/CheckBox/CheckBox';

const backGroundStyle = loginImagePath
  ? { backgroundImage: `url(${loginImagePath})` }
  : { backgroundColor: palette.primary.main };

function VideoDetails() {
  const onSubmit = () => {
    console.log('form submit');
  };
  return (
    <div className={styles.loginWrapper} style={backGroundStyle}>
      <div className={styles.form}>
        <div>
          <OutlinedTextField value="" />
        </div>
        <div>
          <OutlinedTextField value="test" />
        </div>
        <div>
          <DatePickers value="test" />
        </div>
        <div>
          <CheckBox value="" label="" checked />
        </div>
        <div>
          <img alt="poster" />
        </div>
      </div>
      <div className={styles.copyrightText}>{legalText}</div>
    </div>
  );
}

export default VideoDetails;
