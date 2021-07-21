import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import makeStyles from '@material-ui/core/styles/makeStyles';
import InputSkeleton from '../InputSkeleton/InputSkeleton';

const useStyles = makeStyles(() => ({
  checkBox: {
    marginLeft: '-5px',
    color: '#757575',
  },
}));

function CheckBox({ isLoading, checked, ...rest }) {
  const classes = useStyles();

  if (isLoading) {
    return <InputSkeleton />;
  }

  return (
    <FormControlLabel
      className={classes.checkBox}
      {...rest}
      control={<Checkbox color="primary" checked={checked} />}
      labelPlacement="end"
    />
  );
}

export default CheckBox;
