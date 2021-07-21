import React from 'react';
import Typography from '@material-ui/core/Typography';

import styles from './section.module.scss';

function Section({ label, children }) {
  return (
    <section>
      <Typography variant="h2" className={styles.title} color="primary">
        {typeof label === 'string' && label?.toUpperCase()}
      </Typography>
      {children}
    </section>
  );
}

export default Section;
