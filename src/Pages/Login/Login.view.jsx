import { loginImagePath, legaltext } from '../../config';

import { palette } from '../../muiTheme';

import styles from './login.module.scss';

function LoginView({ onSubmit, errorMsg }) {
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.copyrightText}>{legaltext}</div>
    </div>
  );
}
export default LoginView;
