import TextField from '@material-ui/core/TextField';
import classnames from 'classnames';

import InputSkeleton from '../InputSkeleton/InputSkeleton';
import styles from './outlinedTextField.module.scss';

function OutlinedTextField({ isLoading, value, error, className, ...rest }) {
  const fieldClass = classnames(className, styles.textField);

  if (isLoading) {
    return <InputSkeleton />;
  }

  return (
    <TextField
      value={value}
      variant="outlined"
      size="small"
      error={!!error}
      helperText={!!error && error}
      {...rest}
      className={fieldClass}
    />
  );
}

export default OutlinedTextField;
