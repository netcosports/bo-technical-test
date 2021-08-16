import { Form, Field } from 'react-final-form';
import RenderTextInput from '../../Renderers/RenderTextInput';
import { loginImagePath, legalText } from '../../config';
// We could have use the'loginImagePath' directly in 'login.module.scss' with the 'background-image'  scss attribute which is also meant for that purpose
import { palette } from '../../muiTheme';
import styles from './login.module.scss';

const backGroundStyle = loginImagePath
  ? { backgroundImage: `url(${loginImagePath})` }
  : { backgroundColor: palette.primary.main };

function LoginView({ onSubmit, errorMsg }) {
  const disabled = errorMsg !== null ? true : false;
  return (
    <div className={styles.loginWrapper} style={backGroundStyle}>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit} className={styles.form} method="post">
              <Field
                placeholder="Username"
                name="username"
                type="password"
                component={RenderTextInput}
              />
              {/* Decide to put a "Password Type" for the Username field (even if it's not
                a "real password") as I saw on the "login.png" that you mean to hide characters (with the
                small picture at the end of the input.)
                I could have download a police to keep a type="text" input with "password characters"
                like : "https://jsbin-user-assets.s3.amazonaws.com/rafaelcastrocouto/password.ttf"
                but I decide to keep the password type as it appear way more simple. */}
              {errorMsg !== null && <div className={styles.errorMsg}>{errorMsg}</div>}
              <Field
                placeholder="Password"
                name="password"
                type="password"
                component={RenderTextInput}
              />
              {errorMsg !== null && <div className={styles.errorMsg}>{errorMsg}</div>}
              <a href="/forgotPassword" className={styles.link}>
                Forgot password ?
              </a>
              <button type="submit" disabled={disabled} className={styles.btn}>
                LOGIN
              </button>
            </form>
          );
        }}
      </Form>
      <div className={styles.copyrightText}>{legalText}</div>
    </div>
  );
}
export default LoginView;
