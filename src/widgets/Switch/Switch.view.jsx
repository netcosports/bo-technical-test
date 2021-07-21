import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormLabel from '@material-ui/core/FormLabel';

import styles from './switch.module.scss';

function SwitchView({ labelTrue = 'ON', labelFalse = 'OFF', label, ...rest }) {
  return (
    <div className={styles.switchWrapper}>
      <FormLabel>{label}</FormLabel>
      <div>
        <span>{labelFalse}</span>
        <Switch color="primary" {...rest} />
        <span>{labelTrue}</span>
      </div>
    </div>
  );
}

export default SwitchView;
