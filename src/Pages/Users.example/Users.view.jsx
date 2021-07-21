import React, { useEffect, useState } from 'react';

import VirtuosoTable from '../../widgets/VirtuosoTable';
import { SecondaryButton } from '../../widgets/Buttons/Buttons';

import Section from '../../widgets/Section';

import HeaderPage from '../../widgets/HeaderPage/HeaderPage';
import styles from './users.module.scss';

function UsersView({
  data,
  columns,
  t,
  handleNavigate,
  groups,
  setGroupFilter,
  groupFilter,
  filter,
  setFilter,
  isLoading,
  handleGenerateCodeAllUsers,
  isUserPage,
}) {
  const [listHeight, setListHeight] = useState(60);

  const FirstButtonRender = () =>
    isUserPage && (
      <SecondaryButton label={t('importUsers')} onClick={() => handleNavigate('/users/import')} />
    );

  const secondButtonRender = (props) =>
    isUserPage && (
      <SecondaryButton
        {...props}
        label={t('generateMissingCodes')}
        onClick={handleGenerateCodeAllUsers}
      />
    );

  const updateListSize = () => {
    const width = window.innerWidth;
    let height;
    switch (true) {
      case width >= 1020:
        height = 60;
        break;
      case width < 1020 && width > 660:
        height = 55;
        break;
      case width <= 660:
        height = 50;
        break;
      default:
        height = 60;
        break;
    }
    setListHeight(height);
  };

  useEffect(() => {
    updateListSize();
    window.addEventListener('resize', updateListSize);
    return () => {
      window.removeEventListener('resize', updateListSize);
    };
  }, []);

  return (
    <Section label={t('users')}>
      <HeaderPage
        t={t}
        handleNavigatePrimary={() => handleNavigate('/users/new')}
        selectData={groups}
        setSelectFilter={setGroupFilter}
        typeFilter={groupFilter}
        filter={filter}
        setFilter={setFilter}
        handleClick={handleGenerateCodeAllUsers}
        isUserPage
        primaryBtnLabel={t('newUser')}
        secondaryBtnLabel={t('importUsers')}
        firstButtonRender={FirstButtonRender}
        secondButtonRender={secondButtonRender}
        filterPlaceholder={`${t('firstName')}, ${t('lastName')}`}
        height={`${70 - listHeight}vh`}
      />
      <div className={styles.listWrapper}>
        <VirtuosoTable
          data={data}
          columns={columns}
          style={{ height: `${listHeight}vh` }}
          isLoading={isLoading}
        />
      </div>
    </Section>
  );
}

export default UsersView;
