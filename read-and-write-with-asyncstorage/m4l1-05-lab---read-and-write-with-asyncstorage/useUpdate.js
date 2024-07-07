import {useRef, useEffect} from 'react';

/**
 * A custom useEffect hook that only triggers on updates, not on initial mount
 * @param {Function} effect
 * @param {Array<any>} dependencies
 */
export default function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      console.log('Skipping initial mount for useUpdateEffect on deps ', dependencies);
      isInitialMount.current = false;
    } else {
      console.log('Running effect for deps ', dependencies);
      return effect();
    }
  }, dependencies);
}