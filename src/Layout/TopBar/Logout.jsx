import React, { useEffect, useContext } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'; // import { IconButton } from '@material-ui/core';
import { IconButton } from '@material-ui/core';

import Session from '../../utils/Session';
import { AuthAPI, fetchAdminPayload } from '../../utils/api/api';

import UserContext from '../../context/userContext';
import AdminPayloadContext from '../../context/adminPayloadContext';

function Logout() {
  const { setUser } = useContext(UserContext);
  const { setAdminPayload } = useContext(AdminPayloadContext);

  const { firstName, lastName } = Session.user.data;

  const userName = `${!!firstName ? firstName : ''} ${!!lastName ? lastName : ''}`;

  const handleLogout = async () => {
    setUser({});
    Session.logout();
    await AuthAPI.logout();
    window.location.reload();
  };

  const getPayload = async () => {
    try {
      const payload = await fetchAdminPayload();
      setAdminPayload(payload);
    } catch (err) {
      const { message, status } = err.response.data;
      if (status === 403 && message.toLowerCase().includes('token')) {
        handleLogout();
      }
    }
  };

  useEffect(() => {
    getPayload();
  }, []);

  return (
    <>
      <span style={{ marginLeft: '5px', marginRight: '5px' }}>{userName}</span>
      <Tooltip
        title={<p style={{ color: 'white', fontSize: '14px' }}>Logout</p>}
        arrow
        enterDelay={300}
        placement="bottom">
        <IconButton color="secondary" onClick={() => handleLogout()}>
          <ExitToAppRoundedIcon style={{ fontSize: 28 }} />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default Logout;
