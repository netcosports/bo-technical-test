import { Link } from 'react-router-dom';
import { loginImagePath, legalText } from '../../config';

import { palette } from '../../muiTheme';

import styles from './login.module.scss';

function LoginView({ onSubmit, errorMsg, password, setPassword, username, setUsername, login }) {
  const backGroundStyle = loginImagePath
    ? { backgroundImage: `url(${loginImagePath})` }
    : { backgroundColor: palette.primary.main };
  return (
    <div className={styles.loginWrapper} style={backGroundStyle}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(login);
        }}
        className={styles.form}>
        <input
          name="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          placeholder="Username"
        />
        {username.length < 1 ? <p className={styles.paragraph}>Can&rsquo;t be empty</p> : <p></p>}
        <input
          name="password"
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          placeholder="Password"
        />

        {password.length < 1 ? <p className={styles.paragraph}>Can&rsquo;t be empty</p> : <p></p>}
        <Link to="/forgotpassword" className={styles.link}>
          Forgot password ?
        </Link>

        {!errorMsg ? (
          <button className={styles.btn} type="submit">
            LOGIN
          </button>
        ) : (
          <div className={styles.errorMsg}>{!!errorMsg && errorMsg}</div>
        )}
      </form>

      <div className={styles.copyrightText}>{legalText}</div>
    </div>
  );
}
export default LoginView;
