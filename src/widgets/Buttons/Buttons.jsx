import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import styles from './buttons.module.scss';

export const PrimaryButton = ({ upperCase, label, className, disabled, children, ...rest }) => (
  <Button
    variant="contained"
    className={styles.primaryBtn}
    style={upperCase && { textTransform: 'capitalize' }}
    disabled={disabled}
    color="primary"
    {...rest}>
    {label} {children}
  </Button>
);

export const SecondaryButton = ({ upperCase, label, children, ...rest }) => (
  <Button
    variant="outlined"
    className={styles.secondaryBtn}
    style={upperCase && { textTransform: 'capitalize' }}
    {...rest}
    color="primary">
    {label} {children}
  </Button>
);

export const DangerButton = ({ upperCase, label, children, ...rest }) => (
  <Button
    variant="contained"
    className={styles.dangerBtn}
    style={upperCase && { textTransform: 'capitalize' }}
    color="secondary"
    {...rest}>
    {label} {children}
  </Button>
);

export const PrimaryIconBtn = ({ upperCase, label, icon, disabled, ...rest }) => {
  return (
    <IconButton
      className={styles.iconBtn}
      size="small"
      color="primary"
      disabled={disabled}
      {...rest}>
      {icon}
    </IconButton>
  );
};

export const SecondaryIconBtn = ({ upperCase, label, icon, disabled, ...rest }) => (
  <IconButton
    className={styles.secondaryIconBtn}
    size="small"
    color="secondary"
    disabled={disabled}
    {...rest}>
    {icon}
  </IconButton>
);

export const ButtonWithIcon = ({ upperCase, label, icon, disabled, ...rest }) => (
  <Button className={styles.iconBtn} size="small" disabled={disabled} startIcon={icon} {...rest} />
);

export const PrimaryIconBtnWithTooltip = ({ upperCase, label, icon, disabled, ...rest }) => {
  return (
    <Tooltip
      title={<p className={styles.tooltipText}>{label}</p>}
      arrow
      placement="left"
      enterDelay={300}
      enterNextDelay={300}>
      <IconButton
        className={styles.iconBtn}
        size="small"
        color="primary"
        disabled={disabled}
        {...rest}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};
