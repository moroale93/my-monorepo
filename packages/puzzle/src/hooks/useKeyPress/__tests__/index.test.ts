import {fireEvent} from '@testing-library/dom';
import {act, renderHook} from '@testing-library/react-hooks';

import useKeyPress from '..';

describe('useKeyPress', () => {
  it.each([
    'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight',
  ])('on %s press callbacks', (key) => {
    const onSwipeMock = jest.fn();
    renderHook(() => useKeyPress(key, onSwipeMock));

    act(() => {
      fireEvent.keyDown(window, {key});
    });

    expect(onSwipeMock).toHaveBeenCalled();
  });

  it('doesn\'t callbacks if not the correct key', () => {
    const onSwipeMock = jest.fn();
    renderHook(() => useKeyPress('ArrowDown', onSwipeMock));

    act(() => {
      fireEvent.keyDown(window, {key: 'ArrowUp'});
    });

    expect(onSwipeMock).not.toHaveBeenCalled();
  });
});
