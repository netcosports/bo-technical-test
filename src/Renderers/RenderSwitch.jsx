import React from 'react';

import Switch from '../widgets/Switch';

function RenderSwitch({ input, ...rest }) {
  return <Switch {...input} {...rest} />;
}

export default RenderSwitch;
