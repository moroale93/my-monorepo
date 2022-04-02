import {useCallback, useEffect, useRef} from 'react';
import {Direction} from '../../types';

const isTouchDevice = () => window.ontouchstart;

/* Similar to useArrowKeyPress, use callback to
 * let hook user decide when to rerender
 */
export default function useTouchSwipes(
    cb: (dir: Direction) => void,
    threshold = 3,
): void {
  const posRef = useRef({x: 0, y: 0});

  const onTouchStart = useCallback(({changedTouches}: TouchEvent) => {
    posRef.current = {
      x: changedTouches[0].clientX,
      y: changedTouches[0].clientY,
    };
  }, []);

  const onTouchEnd = useCallback(
      ({changedTouches}: TouchEvent) => {
        const {
          current: {x, y},
        } = posRef;
        const cx = changedTouches[0].clientX;
        const cy = changedTouches[0].clientY;
        const dx = cx - x;
        const dy = cy - y;

        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
          cb(cx > x ? Direction.leftToRight : Direction.rightToLeft);
        } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > threshold) {
          cb(cy > y ? Direction.topToBottom : Direction.bottomToTop);
        }
      },
      [cb, threshold],
  );

  useEffect(() => {
    if (isTouchDevice()) {
      window.addEventListener('touchstart', onTouchStart);
      window.addEventListener('touchend', onTouchEnd);
    }

    return () => {
      if (isTouchDevice()) {
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchend', onTouchEnd);
      }
    };
  }, [onTouchEnd, onTouchStart]);
}
