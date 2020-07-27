/**
 * API error model definition
 */
export default class ApiError {
  status;

  message;

  /**
   * Create a new ApiError
   * @param {number} status of the error
   * @param {string} message describing the error
   */
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}
