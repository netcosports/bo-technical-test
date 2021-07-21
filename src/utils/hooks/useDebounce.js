import { useEffect, useRef } from 'react';

/**
 * hook to debounce a function
 * @param fn function
 * @param time how many time should the function be debounced
 * @return {function}
 */

const useDebounce = (fn, time) => {
  const savedTimeout = useRef();

  const cancel = () => clearTimeout(savedTimeout.current);
  useEffect(() => {
    // on un-mount clear timer
    return cancel;
  }, []);

  const result = function (...args) {
    cancel();
    savedTimeout.current = setTimeout(fn, time, ...args);
  };
  result.cancel = cancel;
  return result;
};

export default useDebounce;
