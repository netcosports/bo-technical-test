import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

import config from '../../config';

import NewPasswordView from './NewPassword.view';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Accept-Version': 'v6',
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function NewPasswordContainer() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isRequested, setIsRequested] = useState(false);
  const history = useHistory();
  const query = useQuery();

  const handleBack = () => {
    history.push('/login');
  };

  const handleSubmit = async (values) => {
    try {
      const payload = { ...values };
      delete payload.confirmPassword;
      payload.userId = query.get('userId');
      payload.resetPasswordToken = query.get('resetPasswordToken');

      const url = `${config.apiGwEndpoint}/users-service-api/users/change-password`;

      await axios.post(url, payload, { headers });
      setIsRequested(true);
    } catch (error) {
      setErrorMsg('Connection error');
    }
  };

  return (
    <div>
      <NewPasswordView
        onSubmit={handleSubmit}
        errorMsg={errorMsg}
        isRequested={isRequested}
        handleBack={handleBack}
      />
    </div>
  );
}

export default NewPasswordContainer;
