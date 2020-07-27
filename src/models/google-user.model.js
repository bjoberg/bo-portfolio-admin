/* eslint-disable camelcase */ // disabled because google returns non camelCase
import Roles from '../utils/roles';

class GoogleUser {
  constructor({
    sub, email, family_name, given_name, locale, name, picture, role,
  }) {
    this.sub = sub;
    this.email = email;
    this.familyName = family_name;
    this.givenName = given_name;
    this.locale = locale;
    this.name = name;
    this.picture = picture;
    this.setRole(role);
  }

  /**
   * Set the role of the current user object
   * @param {string} role of the user object
   */
  setRole(role) {
    switch (role) {
      case Roles.ADMIN:
        this.role = Roles.ADMIN;
        break;
      case Roles.READONLY:
        this.role = Roles.READONLY;
        break;
      default:
        this.role = Roles.READONLY;
        break;
    }
  }

  /**
   * Return the object as json
   */
  toJson() { return this; }
}

export default GoogleUser;
