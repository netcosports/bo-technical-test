import { Form, Field } from 'react-final-form';
import RenderTextInput from '../../Renderers/RenderTextInput';
import { loginImagePath, legalText } from '../../config';
// Using 'loginImagePath' directly in 'login.module.scss' with the 'background-image'  react attribute which is meant for that purpose
import { palette } from '../../muiTheme';
import styles from './login.module.scss';

function LoginView({ onSubmit, errorMsg }) {
  return (
    <div className={styles.loginWrapper}>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <Field
              placeholder="Username"
              name="Username"
              type="password"
              component={RenderTextInput}
            />
            <Field
              placeholder="Password"
              name="Password"
              type="password"
              component={RenderTextInput}
            />
            <a href="/forgotPassword" className={styles.link}>
              Forgot password ?
            </a>
            <button type="submit" className={styles.btn}>
              LOGIN
            </button>
          </form>
        )}
      />
      <div className={styles.copyrightText}>{legalText}</div>
    </div>
  );
}
export default LoginView;
