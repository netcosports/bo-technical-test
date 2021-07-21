import { GroupsAPI } from './api/api';
import { ROLES } from '../models/User/User.constants';
import { USERGROUPS } from '../constants/usergroupsConstants';

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
    return { label: type, value: group.id, rawName: group.name };
  });
  return Promise.all(groupsWithTypes);
};

export default groupsToLabelValue;
