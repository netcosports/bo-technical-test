const _env = process.env.REACT_APP_ENVIRONMENT || 'local';

// Endoints configuration
const config = {
  local: {
    backofficeUrl: 'http://localhost:8082',
    apiEndpoint: 'http://localhost:3000',
    apiGwEndpoint: 'http://localhost:3002',
    availableLanguages: ['en', 'fr', 'it'],
  },
  develop: {
    backofficeUrl: 'http://dev-myapp.onrewind.tv',
    apiEndpoint: 'https://dev-api.onrewind.tv',
    apiGwEndpoint: 'https://dev-api-gateway.onrewind.tv',
    availableLanguages: ['en', 'fr', 'it'],
  },
}[_env];

// React Helmet configuration
const siteTitle = 'Back Office template';
const siteDescription = 'Origins Back Office Template for new apps';

const favIconPath = null;
const canonicalUrl = config?.backofficeUrl ?? null;

// Login page configuration

const loginImagePath =
  'https://img.freepik.com/vecteurs-libre/fond-jaune-formes-abstraites-dynamiques_1393-144.jpg';

const legalText =
  '©2021 All rights reserved. On Rewind® is a registered trademark of Origins Digital, a subsidiary of EMG.';

// App general configuration
const menuTitle = 'App Title';
const awsPrefix = 'test-apps/'; // the sub directory to store uploaded assets

export default config;

export {
  loginImagePath,
  favIconPath,
  siteTitle,
  menuTitle,
  legalText,
  siteDescription,
  canonicalUrl,
  awsPrefix,
};
