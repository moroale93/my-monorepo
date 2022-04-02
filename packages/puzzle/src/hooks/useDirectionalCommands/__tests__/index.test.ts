import {act, renderHook} from '@testing-library/react-hooks';

import useKeyPress from '../../useKeyPress';
import useTouchSwipes from '../../useTouchSwipes';
import useSwipe from '..';
import {Direction} from '../../../types';

jest.mock('../../useKeyPress');
jest.mock('../../useTouchSwipes');

describe('useSwipe', () => {
  it.each([
    ['ArrowDown', Direction.topToBottom],
    ['ArrowUp', Direction.bottomToTop],
    ['ArrowLeft', Direction.rightToLeft],
    ['ArrowRight', Direction.leftToRight],
  ])('on %s press callbacks passing the value %s', (key, dir) => {
    let onSwipe: () => void;
    (useKeyPress as jest.Mock).mockImplementation((target, cb) => {
      if (target === key) {
        onSwipe = cb;
      }
    });
    const onSwipeMock = jest.fn();
    renderHook(() => useSwipe(onSwipeMock));

    act(() => {
      onSwipe();
    });

    expect(onSwipeMock).toHaveBeenCalledWith(dir);
  });

  it('callbacks on touches', () => {
    let onSwipe: (dir: Direction) => void;
    (useTouchSwipes as jest.Mock).mockImplementation((cb) => {
      onSwipe = cb;
    });
    const onSwipeMock = jest.fn();
    renderHook(() => useSwipe(onSwipeMock));

    act(() => {
      onSwipe(Direction.topToBottom);
    });

    expect(onSwipeMock).toHaveBeenCalledWith(Direction.topToBottom);
  });

  it('doesn\'t crash if no callback is set', () => {
    const {result} = renderHook(() => useSwipe());

    expect(result.error).toBeUndefined();
  });
});
