import axios from 'axios';

import HttpMethods from '../models/http-methods';
import { createNewApiError } from './service-helpers';

export default class UserService {
  constructor() {
    this.service = axios;
  }

  /**
   * Retrieve information about the session's user
   * @returns {JSON} user object
   * @throws {ApiError}
   */
  async getUserInfo() {
    try {
      const response = await this.service({
        method: HttpMethods.get,
        url: '/api/v1/userinfo',
      });

      return response.data;
    } catch (error) {
      const apiError = createNewApiError(error, 404, 'Unable to retrieve user info');
      throw apiError;
    }
  }

  /**
   * Retrieve role information about the provided google id
   * @param {string} googleId to retrieve role information details for
   * @returns {JSON} role details
   * @throws {ApiError}
   */
  async getUserRole(googleId) {
    try {
      const response = await this.service({
        method: HttpMethods.get,
        url: `/api/v1/user/${googleId}/role`,
      });

      return response.data;
    } catch (error) {
      const apiError = createNewApiError(error, 404, 'Unable to retrieve user role');
      throw apiError;
    }
  }
}
