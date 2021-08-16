import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import UserContext from '../../context/userContext';
import { LanguageContext } from '../../context/languageContext';
import languageConstants from '../../constants/languagesConstants';
import { AuthAPI, UsersAPI } from '../../utils/api/api';
import Session from '../../utils/Session';

import { MODULES, ROLES } from '../../models/User/User.constants';

import LoginView from './Login.view';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Accept-Version': 'v6',
};

function LoginContainer() {
  const [errorMsg, setErrorMsg] = useState(null);
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const { toggleLanguage } = useContext(LanguageContext);
  const setInitialLanguage = (lang) => {
    if (!!lang && languageConstants.some((l) => l === lang)) {
      toggleLanguage(lang);
    } else {
      toggleLanguage(languageConstants[0]);
    }
  };
  const redirectUser = () => {
    Session.loadUser();
    const isAllowed =
      Session.user.hasModules([MODULES.WARREN]) && Session.user.hasRoles([ROLES.USE_NEWS]);
    const landingPage = Session.user.homepage.toString();

    if (isAllowed) {
      history.push(landingPage);
    } else {
      history.push('/login');
      setUser({});
    }
  };
  const handleSubmit = async (values) => {
    if (values.username == null || values.password == null) {
      setErrorMsg("can't be empty");
    } else {
      try {
        const auth = await AuthAPI.login(values);
        const headersWithToken = { ...headers, Authorization: `Bearer ${auth.accessToken}` };
        const userMainData = await UsersAPI.fetchMe(headersWithToken);
        const userData = await UsersAPI.fetchContext(headersWithToken);
        axios.defaults.headers.common = {
          ...headersWithToken,
          'x-account-key': userData.accountKey,
        };
        delete userData.password;
        setUser({ ...userData, ...userMainData, ...auth });
        setInitialLanguage(userMainData?.meta?.language);
        redirectUser();
      } catch (error) {
        setErrorMsg('Connection error');
      }
    }
  };
  useEffect(() => {
    if (!!user?.id && !!user?.accessToken) {
      setInitialLanguage(user?.meta?.language);
      redirectUser();
    }
  }, []);
  useEffect(() => {}, [errorMsg]);

  return (
    <div>
      <LoginView onSubmit={handleSubmit} errorMsg={errorMsg} />
    </div>
  );
}

export default LoginContainer;
