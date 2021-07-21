import React from 'react';
import { KeyboardDateTimePicker } from '@material-ui/pickers';

import InputSkeleton from '../InputSkeleton/InputSkeleton';
import styles from './datePickers.module.scss';

function DatePickers({ isLoading, value, onChange, ...rest }) {
  if (isLoading) {
    return <InputSkeleton />;
  }
  return (
    <>
      <KeyboardDateTimePicker
        value={value}
        onChange={(value) => {
          onChange(value.$d.toISOString());
        }}
        format="DD-MM-YYYY HH:mm "
        ampm={false}
        inputVariant="outlined"
        {...rest}
        className={styles.datePickers}
      />
    </>
  );
}

export default DatePickers;
