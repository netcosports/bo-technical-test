import React from 'react';
import Grid from '@material-ui/core/Grid';

import { PrimaryButton } from '../Buttons/Buttons';
import OutlinedSelect from '../OutlinedSelect';
import OutlinedTextField from '../OutlinedTextField/OutlinedTextField';

import styles from './headerPage.module.scss';

function HeaderPage({
  t,
  handleNavigatePrimary,
  selectData,
  setSelectFilter,
  selectFilter,
  filter,
  setFilter,
  primaryBtnLabel,
  firstButtonRender,
  secondButtonRender,
  skipDisplay,
  filterPlaceholder,
  height = '10vh',
}) {
  const ComplementaryButton = (props) => secondButtonRender(props);
  const AdditionalButton = () => firstButtonRender();

  return (
    <Grid container style={{ height }}>
      <Grid item xs={12} className={styles.buttonsWrapper}>
        <PrimaryButton label={primaryBtnLabel} onClick={handleNavigatePrimary} />
        {firstButtonRender && <AdditionalButton />}
      </Grid>
      <Grid item xs={12} className={styles.selectWrapper}>
        <Grid>
          {!skipDisplay && (
            <OutlinedSelect
              options={selectData}
              onChange={(event) => {
                setSelectFilter(event.target.value);
              }}
              value={selectFilter}
              defaultValue="all"
            />
          )}
          <OutlinedTextField
            className={styles.filterTextField}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label={t('search')}
            placeholder={filterPlaceholder}
          />
        </Grid>
        <Grid>{secondButtonRender && <ComplementaryButton className={styles.thirdBtn} />}</Grid>
      </Grid>
    </Grid>
  );
}

export default HeaderPage;
