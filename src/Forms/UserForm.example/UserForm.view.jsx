import React from 'react';
import { Form, Field } from 'react-final-form';
import Grid from '@material-ui/core/Grid';

import RenderTextInput from '../../Renderers/RenderTextInput';
import { PrimaryButton } from '../../widgets/Buttons/Buttons';
import RenderSelect from '../../Renderers/RenderSelect';
import RenderCheckBox from '../../Renderers/RenderCheckBox';
import Section from '../../widgets/Section';

import styles from './userForm.module.scss';
import { USERGROUPS } from '../../constants/usergroupsConstants';

function UserFormView({
  onSubmit,
  groups,
  isEdit,
  validate,
  initialValues,
  t,
  issuersList,
  isLoading,
}) {
  const getGroupType = (id, groupArray) => {
    const foundGroup = groupArray.find((gp) => gp.value === id);
    return foundGroup?.type;
  };

  return (
    <Section label={!isEdit ? t('newUser') : t('edit')}>
      <Form onSubmit={onSubmit} validate={validate} initialValues={initialValues}>
        {({ handleSubmit, invalid, values, pristine }) => {
          const { usergroup } = values;
          const userGroupType = getGroupType(usergroup, groups);
          const isIssuerOrAdmin =
            userGroupType === USERGROUPS.admin || userGroupType === USERGROUPS.issuers;

          // Condition for edit form
          const isEditIssuerAndAdmin = isEdit && isIssuerOrAdmin;

          const isEditAdmin = isEdit && userGroupType === USERGROUPS.admin;
          const isEditUser = isEdit && userGroupType === USERGROUPS.appUsers;

          // Condition for create form
          const onCreateIssuerAndAdmin = !isEdit && isIssuerOrAdmin;
          const onCreateIssuer = !isEdit && userGroupType === USERGROUPS.issuers;
          return (
            <form onSubmit={handleSubmit} className={styles.formWrapper}>
              <Grid container spacing={2}>
                <Grid item container xs={12} spacing={1}>
                  <Grid item lg={3} xs={12}>
                    <Field
                      name="usergroup"
                      label={t('userGroup')}
                      component={RenderSelect}
                      type="text"
                      options={groups}
                      isLoading={isLoading}
                    />
                  </Grid>
                  {isEdit && (
                    <Grid item xs={12} lg={2}>
                      <Field
                        name="meta.warren.isBlackListed"
                        label={t('blackListed')}
                        type="checkbox"
                        component={RenderCheckBox}
                        fullWidth
                        isLoading={isLoading}
                      />
                    </Grid>
                  )}
                </Grid>
                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="firstName"
                      label={t('firstName')}
                      component={RenderTextInput}
                      type="text"
                      fullWidth
                      isLoading={isLoading}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="lastName"
                      label={t('lastName')}
                      component={RenderTextInput}
                      type="text"
                      fullWidth
                      isLoading={isLoading}
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12} spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="email"
                      label={t('email')}
                      component={RenderTextInput}
                      fullWidth
                      isLoading={isLoading}
                    />
                  </Grid>
                  {(onCreateIssuerAndAdmin || isEditIssuerAndAdmin || isEditUser) && (
                    <Grid item xs={12} sm={6}>
                      <Field
                        name="password"
                        label={t('password')}
                        type="password"
                        component={RenderTextInput}
                        fullWidth
                        isLoading={isLoading}
                      />
                    </Grid>
                  )}
                </Grid>
                {(isEditIssuerAndAdmin || onCreateIssuer || isEditAdmin) && (
                  <Grid item xs={12}>
                    <Field
                      name="meta.warren.IssuerId"
                      label={t('issuers')}
                      type="select"
                      options={issuersList}
                      component={RenderSelect}
                      fullWidth
                      isLoading={isLoading}
                    />
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12} className={styles.btnWrapper}>
                <PrimaryButton label={t('save')} type="submit" disabled={invalid || pristine} />
              </Grid>
            </form>
          );
        }}
      </Form>
    </Section>
  );
}

export default UserFormView;
