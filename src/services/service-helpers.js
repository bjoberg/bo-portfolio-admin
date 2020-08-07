import ApiError from '../models/api-error.model';

/**
 * Format the provided string as a capture date.
 *
 * @param {string} captureDate date to be formatted
 * @returns {string|undefined} if provided string is a valid date, return year-month-day;
 * otherwise undefined
 */
const formatCaptureDate = (captureDate) => {
  try {
    const d = new Date(captureDate);
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

    return `${year}-${month}-${day}`;
  } catch (e) {
    return undefined;
  }
};

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
export { createNewApiError, formatCaptureDate };
