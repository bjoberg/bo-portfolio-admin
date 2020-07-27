import axios from 'axios';

import HttpMethods from '../models/http-methods';
import { createNewApiError } from './service-helpers';

export default class GroupService {
  constructor() {
    this.service = axios;
  }

  /**
   * Retrieve a single group based on id
   *
   * @param {string} id of the group to retrieve
   * @returns {JSON} group object
   * @throws ApiError
   */
  async getGroup(id) {
    try {
      const response = await this.service({
        method: HttpMethods.get,
        url: `/api/v1/group/${id}`,
      });

      return response.data;
    } catch (error) {
      const apiError = createNewApiError(error, 500, `Unable to get group: ${id}`);
      throw apiError;
    }
  }

  /**
   * Retrieve a list of groups
   *
   * @param {number} limit Number of elements to retrieve
   * @param {number} page Elements to retrieve based on limit and number of elements in db
   * @returns {JSON} object of groups
   * @throws ApiError
   */
  async getGroups(limit = 30, page = 0) {
    try {
      const paginationQuery = `?limit=${limit}&page=${page}`;
      const response = await this.service({
        method: HttpMethods.get,
        url: `/api/v1/groups${paginationQuery}`,
      });

      return {
        totalItems: response.data.totalItems,
        data: response.data.rows,
      };
    } catch (error) {
      const apiError = createNewApiError(error, 500, 'Unable to get groups');
      throw apiError;
    }
  }

  /**
   * Delete a single group based on id
   *
   * @param {string} id of the group to delete
   * @returns number of rows destroyed
   * @throws ApiError
   */
  async deleteGroup(id) {
    try {
      return await this.service({
        method: HttpMethods.delete,
        url: `/api/v1/group/${id}`,
      });
    } catch (error) {
      const apiError = createNewApiError(error, 500, `Unable to delete group: ${id}`);
      throw apiError;
    }
  }

  /**
   * Update a single group based on id
   *
   * @param {JSON} group object to be updated
   * @returns {JSON} group object
   * @throws ApiError
   */
  async updateGroup(group) {
    try {
      const response = await this.service({
        method: HttpMethods.put,
        url: `/api/v1/group/${group.id}`,
        data: {
          ...group,
        },
      });

      return {
        count: response.data[0],
        data: response.data[1][0],
      };
    } catch (error) {
      const apiError = createNewApiError(error, 500, `Unable to update group: ${group.id}`);
      throw apiError;
    }
  }

  /**
   * Create a single group
   *
   * @param {JSON} group object to be created
   * @returns {JSON} group object
   * @throws ApiError
   */
  async createGroup(group) {
    try {
      const response = await this.service({
        method: HttpMethods.post,
        url: '/api/v1/group',
        data: {
          thumbnailUrl: group.thumbnailUrl,
          imageUrl: group.imageUrl,
          title: group.title,
          description: group.description,
        },
      });

      return response.data;
    } catch (error) {
      const apiError = createNewApiError(error, 500, 'Unable to create group');
      throw apiError;
    }
  }
}
