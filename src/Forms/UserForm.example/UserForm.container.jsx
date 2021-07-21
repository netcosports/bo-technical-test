import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { AccountsAPI, UsersAPI, IssuersAPI } from '../../utils/api/api';
import { notifSuccess, notifError } from '../../widgets/Notification/notifications';
import { deleteEmptyKey } from '../../utils/objectsFunctions';

import useTranslate from '../../utils/hooks/useTranslate';
import UserContext from '../../context/userContext';
import { generateRandomString } from '../../utils/generateRandomString';
import groupsToLabelValue from '../../utils/groupToLabelValue';

import UserFormView from './UserForm.view';
import text from './userForm.texts';

import { USERGROUPS } from '../../constants/usergroupsConstants';

const INITIAL_VALUES = {
  usergroup: '',
  lastName: '',
  firstName: '',
  email: '',
  password: '',
  meta: {
    warren: {
      isBlackListed: false,
      IssuerId: '',
      isCodeSent: false,
      isActivated: false,
    },
  },
};

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const userGroupIdToName = (groupId, groups) => {
  const foundGroup = groups?.find((group) => group?.value === groupId);
  return foundGroup?.rawName;
};

const userGroupIdToType = (groupId, groups) => {
  const foundGroup = groups?.find((group) => group?.value === groupId);
  return foundGroup?.label;
};

function UserFormContainer() {
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);
  const [groups, setGroups] = useState([{ label: '', value: '' }]);
  const [isLoading, setIsLoading] = useState(false);
  const [issuersList, setIssuersList] = useState([]);

  const { user } = useContext(UserContext);
  const { t } = useTranslate(text);
  const { userId } = useParams();
  const history = useHistory();

  const { AccountId } = user;
  const isEdit = !!userId;

  const validate = (values) => {
    const errors = {};

    if (
      (!isEdit && userGroupIdToType(values?.usergroup, groups) !== USERGROUPS.appUsers) ||
      (isEdit && !!values.password)
    ) {
      if (!values?.password) {
        errors.password = t('required');
      } else if (values?.password?.length > 50) {
        errors.password = t('pwdTooLong', { limit: 50 });
      } else if (values?.password?.length < 6) {
        errors.password = t('pwdTooShort');
      }
    }

    if (!values?.usergroup) {
      errors.usergroup = t('grpRequired');
    }
    if (!values?.email) {
      errors.email = t('required');
    } else if (!!values.email && !validateEmail(values.email)) {
      errors.email = t('invalidEmail');
    }

    return errors;
  };

  const fetchGroups = async () => {
    const fetchedGroups = await AccountsAPI.findGroups(AccountId);
    const normalizedGroups = await groupsToLabelValue(fetchedGroups);
    setGroups([...normalizedGroups]);
  };

  const fetchUser = async () => {
    setIsLoading(true);
    const fetchedUser = await UsersAPI.find(userId);
    const userGroup = await UsersAPI.findGroups(userId);
    delete fetchedUser.password;
    setInitialValues({ ...fetchedUser, usergroup: userGroup[0].id });
    setIsLoading(false);
  };

  const fetchAllDatas = async () => {
    const issuers = await IssuersAPI.findAll();
    setIssuersList(
      issuers.map((iss) => {
        return { label: iss.name, value: iss.id };
      }),
    );
    if (isEdit) {
      await fetchUser();
    }
  };

  useEffect(() => {
    fetchAllDatas();
    fetchGroups();
  }, []);

  const normalizePayload = (values) => {
    const payload = { ...values, Groups: [] };
    payload.Groups.push(payload.usergroup);
    if (isEdit) {
      deleteEmptyKey(payload);
      delete payload.usergroup;
      if (values?.password?.length <= 0) {
        delete payload.password;
      }
      return payload;
    } else {
      payload.username = payload.email;
      if (userGroupIdToName(values?.usergroup, groups) === USERGROUPS.appUsers) {
        payload.password = generateRandomString(8);
      }
      delete payload.usergroup;
      return payload;
    }
  };
  const handleSubmit = async (values) => {
    try {
      const payload = normalizePayload(values);
      if (isEdit) {
        await UsersAPI.update(userId, payload);
        notifSuccess(t('userSaved'));
        fetchUser();
      } else {
        const newUser = await UsersAPI.create(payload);
        notifSuccess(t('userCreated'));
        history.push(`/users/${newUser.id}/edit`);
      }
    } catch (error) {
      notifError(t('error'));
    }
  };

  return (
    <div>
      <UserFormView
        onSubmit={handleSubmit}
        initialValues={initialValues}
        isEdit={isEdit}
        validate={validate}
        t={t}
        groups={groups.map((gp) => {
          return { ...gp, label: t(gp.label), type: gp.label };
        })}
        issuersList={issuersList}
        isLoading={isLoading}
      />
    </div>
  );
}

export default UserFormContainer;
