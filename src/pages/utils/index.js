/**
 * Evaluate error a display status to user
 *
 * @param {Function} setError function to set the page's error
 * @param {Function} setHasError funtion to set the page's error switch
 * @param {number|string} defaultCode error code to display if error object does not have props
 * @param {string} defaultStatusMessage error message to display if error object does not have props
 * @param {Error} error error that was thrown
 */
// eslint-disable-next-line import/prefer-default-export
export const displayPageError = (setError, setHasError, defaultCode, defaultMessage, error) => {
  const { status, message } = error;
  const title = `${status}` || `${defaultCode}`;
  const details = message || defaultMessage;
  setError({ title, details });
  setHasError(true);
};
