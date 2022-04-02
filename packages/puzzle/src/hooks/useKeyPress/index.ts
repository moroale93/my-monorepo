import {useEffect, useCallback} from 'react';

export default function useKeyPress(
    targetKey: string, onPressed: () => void): void {
  const onKeyDown = useCallback(({key}: KeyboardEvent) => {
    if (key === targetKey) {
      onPressed();
    }
  }, [onPressed]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);
}
