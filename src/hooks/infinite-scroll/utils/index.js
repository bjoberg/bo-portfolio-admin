/**
 * Evaluate if a paginated network request is on the last page or not
 *
 * @param {number} total total number of elements in the query
 * @param {number} offset number of elements in each request. Also referred to as "page"
 * @param {number} nextPage page of next pagination request
 */
export const isAtEnd = (total, offset, nextPage) => (total / offset) <= nextPage;

/**
 * Determine if element has scrolled to a specified reload point
 *
 * @param {HTMLElement} scrollRef html element defining the scroll element
 * @param {HTMLElement} containerRef html element defining the scroll container
 * @param {number} pixelsFromBottom number of pixels from bottom of container reload should be
 * triggered
 */
export const isAtReloadPoint = (scrollRef, containerRef = window, pixelsFromBottom = 0) => {
  if (!scrollRef || !containerRef) return false;
  let height = containerRef.innerHeight;
  const { clientHeight } = containerRef;
  if (clientHeight) height = clientHeight;
  const reloadPoint = height + pixelsFromBottom;
  return Math.floor(scrollRef.getBoundingClientRect().bottom) <= reloadPoint;
};
