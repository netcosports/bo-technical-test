import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function FaIcon({ name, size, className }) {
  return <FontAwesomeIcon icon={name} size={size ? size : 'lg'} className={className} />;
}

export default FaIcon;
