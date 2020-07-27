import ApiError from '../models/api-error.model';

/**
 * Create a new ApiError based on input
 *
 * @param {Error} error error that was triggered
 * @param {number} defaultStatusCode default status code if error is unknown
 * @param {string} defaultMessage default status message if error is unknown
 */
const createNewApiError = (error, defaultStatusCode, defaultMessage) => {
  let status = defaultStatusCode;
  let message = defaultMessage;
  if (error.response) {
    if (error.response.status) {
      ({ status } = error.response);
    }
    if (error.response.message) {
      ({ message } = error.response.data);
    }
  }
  return new ApiError(status, message);
};

// eslint-disable-next-line import/prefer-default-export
export { createNewApiError };
