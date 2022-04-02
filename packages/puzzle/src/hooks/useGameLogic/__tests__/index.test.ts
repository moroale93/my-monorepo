import {act, renderHook} from '@testing-library/react-hooks';

import useGameLogic, {GameStatus} from '..';
import {tilesAlmostFinished, tilesFinished} from '../../../testing/mocks/tiles';
import {BLANK, Direction} from '../../../types';

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.useFakeTimers();
});

describe('useGameLogic', () => {
  it('return defaults', () => {
    const {result} = renderHook(() => useGameLogic());

    expect(result.current.gameTime).toBe(0);
    expect(result.current.movesCount).toBe(0);
    expect(result.current.status).toBe(GameStatus.stopped);
    expect(result.current.tiles).toBeUndefined();
    expect(result.current.winner).toBeFalsy();
  });

  it('starts the game', () => {
    const {result} = renderHook(() => useGameLogic());

    act(() => {
      result.current.start(tilesAlmostFinished);
    });

    expect(result.current.gameTime).toBe(0);
    expect(result.current.movesCount).toBe(0);
    expect(result.current.status).toBe(GameStatus.running);
    expect(result.current.tiles).toStrictEqual(tilesAlmostFinished);
    expect(result.current.winner).toBeFalsy();
  });

  it('stops the game', () => {
    const {result} = renderHook(() => useGameLogic());
    const tiles = [
      {id: '1', value: '1'},
      {id: '3', value: '3'},
      {id: '2', value: '2'},
      {id: BLANK, value: BLANK},
    ];
    act(() => {
      result.current.start(tiles);
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    act(() => {
      result.current.stop();
    });

    expect(result.current.gameTime).toBe(1);
    expect(result.current.movesCount).toBe(0);
    expect(result.current.status).toBe(GameStatus.stopped);
    expect(result.current.tiles).toStrictEqual(tiles);
    expect(result.current.winner).toBeFalsy();
  });

  it('does not swipe is no tiles are present', () => {
    const {result} = renderHook(() => useGameLogic());

    act(() => {
      result.current.swipe(Direction.rightToLeft);
    });

    expect(result.current.movesCount).toBe(0);
  });

  it('does not move if no hole', () => {
    const {result} = renderHook(() => useGameLogic());

    act(() => {
      result.current.start([
        {id: '1', value: '1'},
        {id: '2', value: '2'},
        {id: '3', value: '3'},
        {id: BLANK, value: BLANK},
      ]);
    });
    act(() => {
      result.current.swipe(Direction.rightToLeft);
    });
    act(() => {
      result.current.swipe(Direction.bottomToTop);
    });
    act(() => {
      result.current.stop();
    });

    expect(result.current.gameTime).toBe(0);
    expect(result.current.movesCount).toBe(0);
    expect(result.current.status).toBe(GameStatus.stopped);

    act(() => {
      result.current.start([
        {id: BLANK, value: BLANK},
        {id: '1', value: '1'},
        {id: '2', value: '2'},
        {id: '3', value: '3'},
      ]);
    });
    act(() => {
      result.current.swipe(Direction.leftToRight);
    });
    act(() => {
      result.current.swipe(Direction.topToBottom);
    });
    act(() => {
      result.current.stop();
    });

    expect(result.current.gameTime).toBe(0);
    expect(result.current.movesCount).toBe(0);
    expect(result.current.status).toBe(GameStatus.stopped);
  });

  it('win the game', () => {
    const {result} = renderHook(() => useGameLogic());

    act(() => {
      result.current.start(tilesAlmostFinished);
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    act(() => {
      result.current.swipe(Direction.leftToRight);
    });
    act(() => {
      result.current.swipe(Direction.rightToLeft);
    });
    act(() => {
      result.current.swipe(Direction.topToBottom);
    });
    act(() => {
      result.current.swipe(Direction.bottomToTop);
    });
    act(() => {
      result.current.swipe(Direction.rightToLeft);
    });

    expect(result.current.gameTime).toBe(1);
    expect(result.current.movesCount).toBe(5);
    expect(result.current.status).toBe(GameStatus.stopped);
    expect(result.current.tiles).toStrictEqual(tilesFinished);
    expect(result.current.winner).toBeTruthy();
  });
});
