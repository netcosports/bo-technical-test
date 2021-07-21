import React from 'react';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import FaIcon from '../widgets/icons/FaIcons';

const text = {
  namespace: 'NotAuthorized',
  resources: {
    fr: {
      notAuthorized: "Vous n'êtes pas authorisé",
    },
    en: {
      notAuthorized: 'you are not authorized',
    },
    it: {
      notAuthorized: "Vous n'êtes pas authorisé",
    },
  },
};

const iconStyle = {
  height: '40vh',
  color: 'red',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-evenly',
};

function Notauthorized() {
  return (
    <div style={iconStyle}>
      <FaIcon name={faMinusCircle} size="10x" />

      {text.resources.fr.notAuthorized}
    </div>
  );
}

export default Notauthorized;
