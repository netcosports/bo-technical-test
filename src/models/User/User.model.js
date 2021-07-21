import { ROLES } from './User.constants';
import { UsersAPI } from '../../utils/api/api';

const { MANAGE_USERS } = ROLES;

export default class User {
  constructor(data = {}) {
    this.data = data;
  }

  hasModules(moduleCodes) {
    return moduleCodes.every((moduleCode) => {
      return this.data.Modules && this.data.Modules.some((m) => m.code === moduleCode);
    });
  }

  isLogged() {
    return !!this.token;
  }

  // Returns true if the user has all of the listed roles.
  hasRoles(roleNames) {
    return roleNames.every((roleName) => {
      return this.data.Roles && this.data.Roles.some((r) => r.name === roleName);
    });
  }

  // Returns true if the user has at least one of the listed roles.
  hasOneRole(...roleNames) {
    return roleNames.some((roleName) => {
      return this.data.Roles && this.data.Roles.some((r) => r.name === roleName);
    });
  }

  logout() {
    delete this.data.accessToken;
  }

  get isAdmin() {
    return this.hasRoles([MANAGE_USERS]);
  }

  get homepage() {
    if (this.hasRoles([MANAGE_USERS])) {
      return '/home';
    } else {
      return '/news';
    }
  }

  get id() {
    return this.data.id;
  }

  get accountId() {
    return this.data.AccountId;
  }

  get accountKey() {
    return this.data.accountKey;
  }

  get oauth() {
    return this.data.oauth;
  }

  get facebookPageId() {
    return this.oauth.facebook && this.oauth.facebook.pageId;
  }

  get token() {
    return this.data.accessToken;
  }

  get name() {
    return this.data.username;
  }

  get meta() {
    return this.data.meta;
  }

  get language() {
    return (this.data.meta && this.data.meta.language) || null;
  }

  async setLanguage(language) {
    const meta = { ...this.meta, language };
    const updatedUser = await UsersAPI.updateSelf({ meta });
    this.data.meta = updatedUser.meta;
    this.save();
  }

  get accessLevel() {
    return this.data.accessLevel || 0;
  }

  get modules() {
    return this.data.Modules.concat();
  }

  get groups() {
    return this.data.Groups.concat();
  }

  get roles() {
    return this.data.Roles.concat();
  }

  get(propertyName) {
    return this.data[propertyName];
  }

  toString() {
    return JSON.stringify(this.data);
  }
}
