import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import config from '../../config';

import ForgotPasswordView from './ForgotPassword.view';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Accept-Version': 'v6',
};

function ForgotPasswordContainer() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isRequested, setIsRequested] = useState(false);
  const history = useHistory();

  const handleBack = () => {
    history.push('/login');
  };

  const handleSubmit = async (values) => {
    try {
      const url = `${config.apiGwEndpoint}/users-service-api/users/reset-password`;
      await axios.post(url, values, { headers });
      setIsRequested(true);
    } catch (error) {
      setErrorMsg('User not found, please try again');
    }
  };

  return (
    <div>
      <ForgotPasswordView
        onSubmit={handleSubmit}
        errorMsg={errorMsg}
        isRequested={isRequested}
        handleBack={handleBack}
      />
    </div>
  );
}

export default ForgotPasswordContainer;
