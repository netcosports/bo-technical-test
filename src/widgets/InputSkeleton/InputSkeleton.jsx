import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import styles from './inputSkeleton.module.scss';

function InputSkeleton() {
  return <Skeleton variant="rect" width="100%" height="35px" className={styles.skeleton} />;
}

export default InputSkeleton;
