import React from 'react';
import Grid from '@material-ui/core/Grid';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import TopBar from './TopBar';
import SideMenu from './SideMenu';

import styles from './layout.module.scss';

function Layout({ children }) {
  return (
    <>
      <Grid container className={styles.layout}>
        <Grid item xs={12}>
          <TopBar />
        </Grid>
        <Grid item container xs={12} style={{ marginTop: '64px' }}>
          <div className={styles.menuWrapper}>
            <SideMenu />
          </div>
          <div className={styles.contentWrapper}>{children}</div>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
}

export default Layout;
