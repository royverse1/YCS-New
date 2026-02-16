import { useEffect, useRef, useCallback } from 'react';

const useRaf = (callback) => {
  const rafRef = useRef(null);
  
  const loop = useCallback((time) => {
      callback(time);
      rafRef.current = requestAnimationFrame(loop);
  }, [callback]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if(rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [loop]);
  
  return () => {
      if(rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
  }
};

export default useRaf;
