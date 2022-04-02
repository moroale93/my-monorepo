import {act, renderHook} from '@testing-library/react-hooks';

import useTimer from '..';

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.useFakeTimers();
});

describe('useTimer', () => {
  it('return defaults', () => {
    const {result} = renderHook(() => useTimer());

    expect(result.current[0]).toBe(0);
  });

  it('starts and stops the timer', () => {
    const {result} = renderHook(() => useTimer());

    act(() => {
      result.current[1].start();
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    act(() => {
      result.current[1].stop();
    });

    expect(result.current[0]).toBe(1);
  });
});
