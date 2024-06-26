import { loginImagePath, legalText } from '../../config';
import { palette } from '../../muiTheme';

import { Form, Field } from 'react-final-form';
import { PrimaryButton, DangerButton } from '../../widgets/Buttons/Buttons';
import RenderTextInput from '../../Renderers/RenderTextInput';
import { Link } from 'react-router-dom';

import styles from './login.module.scss';

function LoginView({ onSubmit, errorMsg }) {
  const validate = (values) => {
    const errors = {};
    if (!values?.username) {
      errors.username = "Can't be empty";
    }
    if (!values?.password) {
      errors.password = "Can't be empty";
    }
    return errors;
  };

  return (
    <div className={styles.loginWrapper}>
      <Form onSubmit={onSubmit} validate={validate}>
        {({ handleSubmit, invalid }) => {
          return (
            <form onSubmit={handleSubmit} className={styles.form}>
              <Field name="username" label="Username" type="input" component={RenderTextInput} />
              <div className={styles.errorMsg}>{!!errorMsg && errorMsg}</div>
              <Field name="password" label="Password" type="input" component={RenderTextInput} />
              <div className={styles.errorMsg}>{!!errorMsg && errorMsg}</div>
              <Link to="/forgotpassword" className={styles.link}>
                {'Forgot password?'}
              </Link>
              <PrimaryButton
                label="Login"
                type="submit"
                className={styles.btn}
                disabled={invalid}
              />
            </form>
          );
        }}
      </Form>
      <div className={styles.copyrightText}>{legalText}</div>
    </div>
  );
}
export default LoginView;
