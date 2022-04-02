import {fireEvent} from '@testing-library/dom';
import {act, renderHook} from '@testing-library/react-hooks';

import useTouchSwipes from '..';
import {Direction} from '../../../types';

describe('useTouchSwipes', () => {
  it.each([
    [
      {clientX: 0, clientY: 100}, {clientX: 100, clientY: 100},
      Direction.leftToRight,
    ],
    [
      {clientX: 100, clientY: 0}, {clientX: 100, clientY: 100},
      Direction.topToBottom,
    ],
    [
      {clientX: 100, clientY: 100}, {clientX: 100, clientY: 0},
      Direction.bottomToTop,
    ],
    [
      {clientX: 100, clientY: 100}, {clientX: 0, clientY: 100},
      Direction.rightToLeft,
    ],
  ])('callbacks on touches', (start, end, dir) => {
    window.ontouchstart = jest.fn();
    const onSwipeMock = jest.fn();
    renderHook(() => useTouchSwipes(onSwipeMock));

    act(() => {
      fireEvent.touchStart(window, {changedTouches: [start]});
      fireEvent.touchEnd(window, {changedTouches: [end]});
    });

    expect(onSwipeMock).toHaveBeenCalledWith(dir);
  });

  it('doesn\'t callbacks if not a touch device', () => {
    window.ontouchstart = null;
    const onSwipeMock = jest.fn();
    renderHook(() => useTouchSwipes(onSwipeMock));

    act(() => {
      fireEvent.touchStart(
          window, {changedTouches: [{clientX: 100, clientY: 100}]});
      fireEvent.touchEnd(
          window, {changedTouches: [{clientX: 0, clientY: 100}]});
    });

    expect(onSwipeMock).not.toHaveBeenCalled();
  });

  it('doesn\'t callbacks if no movements', () => {
    window.ontouchstart = jest.fn();
    const onSwipeMock = jest.fn();
    renderHook(() => useTouchSwipes(onSwipeMock));

    act(() => {
      fireEvent.touchStart(
          window, {changedTouches: [{clientX: 100, clientY: 100}]});
      fireEvent.touchEnd(
          window, {changedTouches: [{clientX: 100, clientY: 100}]});
    });

    expect(onSwipeMock).not.toHaveBeenCalled();
  });
});
