import { useCallback, useEffect, useRef, useState } from 'react';
import ResizeObserver from "resize-observer-polyfill";

const useResizeObserver = ({
  callback,
  element
}) => {
  const current = element && element.current;
  const observer = useRef(null);
  const [height, setHeight] = useState();
  const handleResize = useCallback(entries => {
    if (!Array.isArray(entries)) {
      return;
    }

    const entry = entries[0];
    setHeight(entry.contentRect.height);

    if (callback) {
      callback(entry.contentRect);
    }
  }, [callback]);
  useEffect(() => {
    if (observer && observer.current && current) {
      observer.current.unobserve(current);
    }

    const resizeObserverOrPolyfill = ResizeObserver;
    observer.current = new resizeObserverOrPolyfill(entries => handleResize(entries));
    observe();
    return () => {
      if (observer && observer.current && element && element.current) {
        observer.current.unobserve(element.current);
      }
    };
  }, [current]);

  const observe = () => {
    if (element && element.current && observer.current) {
      observer.current.observe(element.current);
    }
  };
};

export default useResizeObserver;