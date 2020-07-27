export default class AuthService {
  /**
   * Initiate the Google authentication flow
   * Note: You cannot make an ajax request here. You need to redirect
   */
  static loginGoogle() {
    const base = window.location.origin;
    const route = '/auth/google/login';
    window.location = `${base}${route}`;
  }

  /**
   * Initiate the Google logout flow
   * Note: You cannot make an ajax request here. You need to redirect
   */
  static logoutGoogle() {
    const base = window.location.origin;
    const route = '/auth/google/logout';
    window.location = `${base}${route}`;
  }
}
