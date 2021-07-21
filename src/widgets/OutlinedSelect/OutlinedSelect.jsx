import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import InputSkeleton from '../InputSkeleton/InputSkeleton';

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: '120px',
    margin: '5px',
  },
}));

function OutlinedSelect({
  className,
  isLoading,
  label,
  value,
  options,
  error,
  errorText,
  ...rest
}) {
  const classes = useStyles();

  if (isLoading) {
    return <InputSkeleton />;
  }

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel error={error} id="selectLabel">
        {label}
      </InputLabel>
      <Select
        labelId="selectLabel"
        id="selectLabel"
        value={value}
        label={label}
        error={error}
        {...rest}>
        {options?.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText style={{ color: '#f44336' }}>{errorText}</FormHelperText>}
    </FormControl>
  );
}

export default OutlinedSelect;
