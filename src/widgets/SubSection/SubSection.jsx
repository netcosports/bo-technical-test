import React from 'react';
import Typography from '@material-ui/core/Typography';

import styles from './subSection.module.scss';

function SubSection({ label, children }) {
  return (
    <section className={styles.sectionWrapper}>
      <Typography variant="h5" className={styles.title} color="primary">
        {label}
      </Typography>
      {children}
    </section>
  );
}

export default SubSection;
