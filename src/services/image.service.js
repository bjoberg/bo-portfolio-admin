import axios from 'axios';

import HttpMethods from '../models/http-methods';
import { createNewApiError } from './service-helpers';

export default class ImageService {
  constructor() {
    this.service = axios;
  }

  /**
   * Retrieve a single image based on id
   *
   * @param {string} id of the image to retrieve
   * @returns {JSON} image object
   * @throws ApiError
   */
  async getImage(id) {
    try {
      const response = await this.service({
        method: HttpMethods.get,
        url: `/api/v1/image/${id}`,
      });

      return response.data;
    } catch (error) {
      const apiError = createNewApiError(error, 404, `Error retrieving image: ${id}`);
      throw apiError;
    }
  }

  /**
   * Retrieve a list of images
   *
   * @param {number} limit Number of elements to retrieve
   * @param {number} page Elements to retrieve based on limit and number of elements in db
   * @returns {JSON} object of images
   * @throws ApiError
   */
  async getImages(limit = 30, page = 0) {
    try {
      const paginationQuery = `?limit=${limit}&page=${page}`;
      const response = await this.service({
        method: HttpMethods.get,
        url: `/api/v1/images${paginationQuery}`,
      });

      return {
        totalItems: response.data.totalItems,
        data: response.data.rows,
      };
    } catch (error) {
      const apiError = createNewApiError(error, 404, 'Unable to retrieve images.');
      throw apiError;
    }
  }

  /**
   * Retrieve a list of images associated with a specific group
   *
   * @param {number} limit Number of elements to retrieve
   * @param {number} page Elements to retrieve based on limit and number of elements in db
   * @param {string} groupId unique id of group to get images for
   */
  async getImagesForGroup(limit = 30, page = 0, groupId) {
    try {
      const paginationQuery = `?limit=${limit}&page=${page}`;
      const response = await this.service({
        method: HttpMethods.get,
        url: `/api/v1/group/${groupId}/images${paginationQuery}`,
      });

      return {
        totalItems: response.data.totalItems,
        data: response.data.rows,
      };
    } catch (error) {
      const apiError = createNewApiError(error, 404, 'Unable to retrieve images for group.');
      throw apiError;
    }
  }

  /**
   * Retrieve a list of images not associated with a specific group
   *
   * @param {number} limit Number of elements to retrieve
   * @param {number} page Elements to retrieve based on limit and number of elements in db
   * @param {string} groupId unique id of group to get images for
   */
  async getImagesNotForGroup(limit = 30, page = 0, groupId) {
    try {
      const paginationQuery = `?limit=${limit}&page=${page}`;
      const response = await this.service({
        method: HttpMethods.get,
        url: `/api/v1/group/${groupId}/!/images${paginationQuery}`,
      });

      return {
        totalItems: response.data.totalItems,
        data: response.data.rows,
      };
    } catch (error) {
      const apiError = createNewApiError(error, 404, 'Unable to retrieve images not associated with group.');
      throw apiError;
    }
  }

  /**
   * Associate images to the specified group
   *
   * @param {string} groupId unique id of group to associated images to
   * @param {string[]} imageIds unique ids of images to associate to group
   * @returns {object} describing state of association
   * @throws ApiError
   */
  async addImagesToGroup(groupId, imageIds) {
    try {
      let query = '';
      imageIds.forEach((id, i) => {
        if (i === 0) query = `?imageId=${id}`;
        else query = `${query}&imageId=${id}`;
      });
      return await this.service({
        method: HttpMethods.post,
        url: `/api/v1/group/${groupId}/images${query}`,
      });
    } catch (error) {
      const apiError = createNewApiError(error, 500, `Error adding images to ${groupId}`);
      throw apiError;
    }
  }

  /**
   * Delete a single image based on id
   *
   * @param {string} id of the image to delete
   * @returns number of rows destroyed
   * @throws ApiError
   */
  async deleteImage(id) {
    try {
      return await this.service({
        method: HttpMethods.delete,
        url: `/api/v1/image/${id}`,
      });
    } catch (error) {
      const apiError = createNewApiError(error, 500, `Error deleting image: ${id}`);
      throw apiError;
    }
  }

  /**
   * Disassociate images from the specified group
   *
   * @param {string} groupId unique id of group to disassociate images from
   * @param {string[]} imageIds unique ids of images to disassociate from group
   * @returns {object} describing state of deletion
   * @throws ApiError
   */
  async deleteImagesFromGroup(groupId, imageIds) {
    try {
      let query = '';
      imageIds.forEach((id, i) => {
        if (i === 0) query = `?imageId=${id}`;
        else query = `${query}&imageId=${id}`;
      });
      return await this.service({
        method: HttpMethods.delete,
        url: `/api/v1/group/${groupId}/images${query}`,
      });
    } catch (error) {
      const apiError = createNewApiError(error, 500, `Error deleting images from ${groupId}`);
      throw apiError;
    }
  }

  /**
   * Update a single image based on id
   *
   * @param {JSON} image object to be updated
   * @returns {JSON} image object
   * @throws ApiError
   */
  async updateImage(image) {
    try {
      const response = await this.service({
        method: HttpMethods.put,
        url: `/api/v1/image/${image.id}`,
        data: {
          ...image,
        },
      });

      return {
        count: response.data[0],
        data: response.data[1][0],
      };
    } catch (error) {
      const apiError = createNewApiError(error, 500, `Error updating image: ${image.id}`);
      throw apiError;
    }
  }

  /**
   * Create a single image
   *
   * @param {JSON} image object to be created
   * @returns {JSON} image object
   * @throws ApiError
   */
  async createImage(image) {
    try {
      const response = await this.service({
        method: HttpMethods.post,
        url: '/api/v1/image',
        data: {
          thumbnailUrl: image.thumbnailUrl,
          imageUrl: image.imageUrl,
          title: image.title,
          description: image.description,
          location: image.location,
          width: image.width,
          height: image.height,
        },
      });

      return response.data;
    } catch (error) {
      const apiError = createNewApiError(error, 500, 'Error creating image');
      throw apiError;
    }
  }
}
