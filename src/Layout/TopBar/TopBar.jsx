import React from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

import LanguageSelect from './LanguageSelect';
import { menuTitle } from '../../config';

import styles from './topBar.module.scss';
import Logout from './Logout';

function TopBar() {
  const history = useHistory();

  return (
    <div>
      <AppBar>
        <Toolbar className={styles.toolBar}>
          <Button onClick={() => history.push('/home')}>
            <Typography color="secondary" className={styles.logo}>
              {menuTitle}
            </Typography>
          </Button>
          <div className={styles.rightItemsWrapper}>
            <LanguageSelect />
            <Logout />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default TopBar;
