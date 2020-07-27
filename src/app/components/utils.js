/**
 * Check to make sure the provided value exists
 *
 * @param {string} value value to evaluate
 */
const isNotEmpty = (value) => {
  if (!value || value.length === 0) return false;
  return true;
};

/**
 * Validate the provided string as a url
 *
 * Resource: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
 * @param {string} url value of the url
 */
const isValidUrl = (url) => {
  const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
    + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
    + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
    + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
    + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
    + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return pattern.test(url);
};

export {
  isNotEmpty, isValidUrl,
};
