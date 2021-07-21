import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

import useTranslate from '../../utils/hooks/useTranslate';

import texts from './sidemenu.texts';
import styles from './sideMenu.module.scss';
import MENU_ENTRIES from '../../menuConfig';
import Session from '../../utils/Session';

function SideMenu() {
  const history = useHistory();
  const location = useLocation();

  const { t } = useTranslate(texts);

  const useStyles = makeStyles(() => ({
    indicator: {
      backgroundColor: '#fff',
      left: '0px',
    },
  }));

  const classes = useStyles();
  const handleChange = (event, value) => {
    history.push(value);
  };

  const currentBaseLocation = `/${location.pathname.split('/')[1]}`;

  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      value={currentBaseLocation}
      onChange={handleChange}
      className={styles.tabs}
      classes={{ indicator: classes.indicator }}>
      {MENU_ENTRIES.map(
        ({ icon, name, path, skipDisplay, requiredRoles = [] }) =>
          !skipDisplay &&
          Session.user.hasRoles(requiredRoles) && (
            <Tab key={name} icon={icon} label={t(name)} value={path} className={styles.tab} />
          ),
      )}
    </Tabs>
  );
}

export default SideMenu;
