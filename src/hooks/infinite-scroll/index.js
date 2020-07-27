import { useState, useEffect, useCallback } from 'react';

import { isAtEnd, isAtReloadPoint } from './utils';

/**
 * Trigger function (pagination request) when a user has reached a certain point on the screen.
 *
 * @param {Function} callback function to call when scroll ref hits the reload point
 * @param {boolean} isEnd switch determining if application is at the end of data
 * @param {boolean} hasError switch determining if application received error while fetching data
 * @param {HTMLElement} scrollRef html element defining the scroll element
 * @param {HTMLElement} containerRef html element defining the scroll container
 * @returns {boolean} loading state of the container
 */
const useInfiniteScroll = (callback, isEnd, hasError, scrollRef, containerRef = window) => {
  const [isFetching, setIsFetching] = useState(false);

  /**
   * Get the element of the containerRef.
   * Note: if the element is not the same as the window, it is a ref and should be set
   * to ref.current
   */
  const getContainerEl = useCallback(() => {
    let el = containerRef;
    if (el !== window) el = el.current;
    return el;
  }, [containerRef]);

  /**
   * Attempt to trigger the callback function
   */
  const handleScroll = useCallback(() => {
    const container = getContainerEl();
    const atReloadPoint = isAtReloadPoint(scrollRef.current, container, 200);
    if (!atReloadPoint || isFetching || isEnd || hasError) return;
    setIsFetching(true);
  }, [getContainerEl, hasError, isEnd, isFetching, scrollRef]);

  /**
   * Add the scroll listener callback function to the scroll container
   */
  useEffect(() => {
    const el = getContainerEl();
    if (el && el !== null) el.addEventListener('scroll', handleScroll);
    return () => { if (el && el !== null) el.removeEventListener('scroll', handleScroll); };
  }, [containerRef, getContainerEl, handleScroll]);

  /**
   * Run the callback function
   */
  useEffect(() => {
    if (!isFetching || hasError) return;
    callback(setIsFetching);
  }, [callback, hasError, isFetching]);

  return [isFetching];
};

export { useInfiniteScroll, isAtEnd, isAtReloadPoint };
