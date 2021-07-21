/* eslint-disable no-use-before-define */
/* eslint-disable indent */
import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import VpnKeyOutlined from '@material-ui/icons/VpnKeyOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import { AccountsAPI, UsersAPI, GroupsAPI, WarrenAuthAPI, IssuersAPI } from '../../utils/api/api';
import UserContext from '../../context/userContext';
import useTranslate from '../../utils/hooks/useTranslate';
import { PrimaryIconBtnWithTooltip } from '../../widgets/Buttons/Buttons';
import { notifSuccess, notifError, confirmAction } from '../../widgets/Notification/notifications';
import UsersView from './Users.view';

import { ROLES } from '../../models/User/User.constants';
import { USERGROUPS } from '../../constants/usergroupsConstants';
import styles from './users.module.scss';
import text from './users.texts';

const Actions = ({ rowData, handleNavigate, handleDelete, handleGenerateCode, t }) => {
  const { id } = rowData;
  return (
    <div>
      <PrimaryIconBtnWithTooltip
        label={t('generateCode')}
        icon={<VpnKeyOutlined />}
        onClick={() => handleGenerateCode(id)}
      />
      <PrimaryIconBtnWithTooltip
        icon={<EditOutlinedIcon />}
        onClick={() => handleNavigate(`/users/${id}/edit`)}
        label={t('edit')}
      />
      <PrimaryIconBtnWithTooltip
        icon={<DeleteForeverOutlinedIcon />}
        onClick={() => handleDelete(id)}
        label={t('delete')}
      />
    </div>
  );
};

const groupsToLabelValue = async (groups) => {
  const groupsWithTypes = await groups.map(async (group) => {
    const roles = await GroupsAPI.findRoles(group.id);
    let type = '';
    if (roles.some((role) => role.name === ROLES.MANAGE_USERS)) {
      type = USERGROUPS.admin;
    } else if (roles.some((role) => role.name === ROLES.USE_NEWS)) {
      type = USERGROUPS.issuers;
    } else {
      type = USERGROUPS.appUsers;
    }
    return { label: type, value: group.id };
  });
  return Promise.all(groupsWithTypes);
};

const issuerIdtoName = (id, issuers) => {
  const foundIssuer = issuers.find((iss) => iss.id === id);
  return foundIssuer?.name ?? '';
};

function UsersContainer() {
  const [groups, setGroups] = useState([{ label: 'all', value: 'all' }]);
  const [usersList, setUsersList] = useState([]);
  const [issuersList, setIssuersList] = useState([]);
  const [groupFilter, setGroupFilter] = useState('all');
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(UserContext);
  const history = useHistory();
  const { t } = useTranslate(text);
  const { AccountId } = user;

  const handleNavigate = (path) => {
    history.push(path);
  };
  const handleDelete = async (id) => {
    try {
      const reply = await confirmAction(t('confirmDelete'), t('yes'), t('no'));
      if (reply) {
        await UsersAPI.delete(id);
        notifSuccess(t('deleteSuccess'));
        fetchInitialData();
      }
    } catch (error) {
      notifError(t('deleteError'));
    }
  };

  const handleGenerateCode = async (id) => {
    try {
      await WarrenAuthAPI.renewOne(id);
      fetchInitialData();
      notifSuccess(t('codeSent'));
    } catch (error) {
      notifError(t('error'));
    }
  };

  const handleGenerateCodeAllUsers = async () => {
    try {
      const usersWithoutCode = usersList
        .filter((us) => {
          return !!us?.meta?.warren?.isCodeSent === false;
        })
        .map((u) => u.id);
      await WarrenAuthAPI.renewAll(usersWithoutCode);
      fetchInitialData();
      notifSuccess(t('codeSent'));
    } catch (error) {
      notifError(t('error'));
    }
  };

  const columns = [
    { id: 'firstName', label: t('firstName'), align: 'left', render: (r) => r.firstName },
    { id: 'lastName', label: t('lastName'), align: 'left', render: (r) => r.lastName },
    {
      id: 'issuerName',
      label: t('partner'),
      align: 'left',
      render: (r) => issuerIdtoName(r?.meta?.warren?.IssuerId, issuersList),
    },
    { id: 'email', label: t('email'), align: 'left', render: (r) => r.email },
    {
      id: 'isCodeSent',
      label: t('codeSent'),
      render: (r) => (
        <p className={styles.checkIconsWrapper}>
          {r?.meta?.warren?.isCodeSent ? (
            <CheckCircleIcon className={styles.checkIcon} />
          ) : (
            <CancelIcon className={styles.cancelIcon} />
          )}
        </p>
      ),
    },
    {
      id: 'isActivated',
      label: t('activated'),
      render: (r) => (
        <p className={styles.checkIconsWrapper}>
          {r?.meta?.warren?.isActivated ? (
            <CheckCircleIcon className={styles.checkIcon} />
          ) : (
            <CancelIcon className={styles.cancelIcon} />
          )}
        </p>
      ),
    },
    {
      id: 'actions',
      label: t('actions'),
      render: (r) => (
        <Actions
          rowData={r}
          handleNavigate={handleNavigate}
          handleDelete={handleDelete}
          handleGenerateCode={handleGenerateCode}
          t={t}
        />
      ),
    },
  ];

  const filterUsers = () => {
    const filterToLowerCase = (!!filter && filter?.toLowerCase()) || '';

    const filteredByGroup =
      groupFilter === 'all' ? usersList : usersList.filter((user) => user.group.id === groupFilter);

    const filteredUsers =
      filter === ''
        ? filteredByGroup
        : filteredByGroup.filter((usr) => {
            const reducedUsr = {
              firstName: usr.firstName?.toLowerCase(),
              lastName: usr.lastName?.toLowerCase(),
            };
            return (
              reducedUsr.firstName?.includes(filterToLowerCase) ||
              reducedUsr.lastName?.includes(filterToLowerCase)
            );
          });

    return filteredUsers;
  };

  const fetchInitialData = async () => {
    setIsLoading(true);
    const fetchedUsers = await AccountsAPI.findUsers(AccountId);
    const fetchedIssuers = await IssuersAPI.findAll();
    setIssuersList(fetchedIssuers);
    setUsersList(fetchedUsers);
    setIsLoading(false);
  };

  const fetchGroups = async () => {
    const fetchedGroups = await AccountsAPI.findGroups(AccountId);
    const normalizedGroups = await groupsToLabelValue(fetchedGroups);
    setGroups([{ value: 'all', label: 'all' }, ...normalizedGroups]);
  };

  useEffect(() => {
    fetchInitialData();
    fetchGroups();
  }, []);

  return (
    <div>
      <UsersView
        data={filterUsers()}
        columns={columns}
        t={t}
        groups={groups.map((gp) => {
          return { ...gp, label: t(gp.label) };
        })}
        handleNavigate={handleNavigate}
        setGroupFilter={setGroupFilter}
        groupFilter={groupFilter}
        filter={filter}
        setFilter={setFilter}
        isLoading={isLoading}
        handleGenerateCodeAllUsers={handleGenerateCodeAllUsers}
        isUserPage
      />
    </div>
  );
}

export default UsersContainer;
