import {act, renderHook} from '@testing-library/react-hooks';

import useRecordScore from '..';

describe('useRecordScore', () => {
  it('return defaults', () => {
    const {result} = renderHook(() => useRecordScore());

    expect(result.current.gameTime).toBe(0);
    expect(result.current.movesCount).toBe(0);
  });

  it('return the saved record', () => {
    const {result} = renderHook(() => useRecordScore());

    act(() => {
      result.current.saveNewRecord({
        gameTime: 4,
        movesCount: 5,
      });
    });

    expect(result.current.gameTime).toBe(4);
    expect(result.current.movesCount).toBe(5);

    act(() => {
      result.current.saveNewRecord({
        gameTime: 2,
        movesCount: 1,
      });
    });

    expect(result.current.gameTime).toBe(4);
    expect(result.current.movesCount).toBe(5);
  });
});
