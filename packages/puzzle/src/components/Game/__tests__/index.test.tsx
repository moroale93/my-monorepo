import {render, screen, act, fireEvent} from '@testing-library/react';
import {mocked} from 'ts-jest/dist/utils/testing';
import Game from '..';
import themeWrapper from '../../../testing/utils/themeWrapper';
import useGameLogic, {GameStatus} from '../../../hooks/useGameLogic';
import {tilesAlmostFinished} from '../../../testing/mocks/tiles';
import {BLANK, Direction} from '../../../types';

jest.mock('../../../hooks/useGameLogic');

const mockedUseGameLogic = mocked(useGameLogic, true);

describe('Game', () => {
  it('renders correctly', () => {
    mockedUseGameLogic.mockReturnValue({
      status: GameStatus.stopped,
      start: jest.fn(),
      stop: jest.fn(),
      swipe: jest.fn(),
      tiles: undefined,
      movesCount: 0,
      gameTime: 0,
      winner: false,
    });
    render(<Game />, {
      wrapper: themeWrapper,
    });

    screen.getByRole('button', {name: 'Start'});
    expect(
        screen.getByRole('timer', {name: 'Time'}).textContent).toBe('0:00:00');
    expect(screen.getByRole('status', {name: 'Moves'}).textContent).toBe('0');
  });

  it('start game', () => {
    const startMock = jest.fn();
    mockedUseGameLogic.mockReturnValue({
      status: GameStatus.stopped,
      start: startMock,
      stop: jest.fn(),
      swipe: jest.fn(),
      tiles: [],
      movesCount: 0,
      gameTime: 0,
      winner: false,
    });

    render(<Game />, {
      wrapper: themeWrapper,
    });

    act(() => {
      fireEvent.click(screen.getByRole('button', {name: 'Start'}));
    });

    expect(startMock).toHaveBeenCalled();
  });

  it('stop game', () => {
    const stopMock = jest.fn();
    mockedUseGameLogic.mockReturnValue({
      status: GameStatus.running,
      start: jest.fn(),
      stop: stopMock,
      swipe: jest.fn(),
      tiles: tilesAlmostFinished,
      movesCount: 32,
      gameTime: 31,
      winner: false,
    });

    render(<Game />, {
      wrapper: themeWrapper,
    });

    expect(
        screen.getByRole('timer', {name: 'Time'}).textContent).toBe('0:00:31');
    expect(screen.getByRole('status', {name: 'Moves'}).textContent).toBe('32');
    tilesAlmostFinished.filter((tile) => tile.value !== BLANK)
        .forEach((tile) => screen.getByRole('button', {name: tile.value}));

    act(() => {
      fireEvent.click(screen.getByRole('button', {name: 'Stop'}));
    });

    expect(stopMock).toHaveBeenCalled();
  });

  it('moves a tile on swipe', () => {
    const swipeMock = jest.fn();
    mockedUseGameLogic.mockReturnValue({
      status: GameStatus.running,
      start: jest.fn(),
      stop: jest.fn(),
      swipe: swipeMock,
      tiles: tilesAlmostFinished,
      movesCount: 32,
      gameTime: 31,
      winner: false,
    });

    render(<Game />, {
      wrapper: themeWrapper,
    });

    act(() => {
      fireEvent.keyDown(window, {key: 'ArrowDown'});
    });

    expect(swipeMock).toHaveBeenCalledWith(Direction.topToBottom);
  });

  it('moves a tile on click', () => {
    const swipeMock = jest.fn();
    mockedUseGameLogic.mockReturnValue({
      status: GameStatus.running,
      start: jest.fn(),
      stop: jest.fn(),
      swipe: swipeMock,
      tiles: [
        {id: '1', value: '1'}, {id: '2', value: '2'}, {id: '3', value: '3'},
        {id: '4', value: '4'}, {id: BLANK, value: BLANK}, {id: '5', value: '5'},
        {id: '6', value: '6'}, {id: '7', value: '7'}, {id: '8', value: '8'},
      ],
      movesCount: 32,
      gameTime: 31,
      winner: false,
    });

    render(<Game edgeLength={3} />, {
      wrapper: themeWrapper,
    });

    act(() => {
      fireEvent.click(screen.getByRole('button', {name: '2'}));
    });

    expect(swipeMock).toHaveBeenLastCalledWith(Direction.topToBottom);

    act(() => {
      fireEvent.click(screen.getByRole('button', {name: '5'}));
    });

    expect(swipeMock).toHaveBeenLastCalledWith(Direction.rightToLeft);

    act(() => {
      fireEvent.click(screen.getByRole('button', {name: '7'}));
    });

    expect(swipeMock).toHaveBeenLastCalledWith(Direction.bottomToTop);

    act(() => {
      fireEvent.click(screen.getByRole('button', {name: '4'}));
    });

    expect(swipeMock).toHaveBeenLastCalledWith(Direction.leftToRight);
  });

  it('does not move a blocked tile on click', () => {
    const swipeMock = jest.fn();
    mockedUseGameLogic.mockReturnValue({
      status: GameStatus.running,
      start: jest.fn(),
      stop: jest.fn(),
      swipe: swipeMock,
      tiles: tilesAlmostFinished,
      movesCount: 32,
      gameTime: 31,
      winner: false,
    });

    render(<Game />, {
      wrapper: themeWrapper,
    });

    act(() => {
      fireEvent.click(screen.getByRole('button', {name: '1'}));
    });

    expect(swipeMock).not.toHaveBeenCalled();
  });

  it('shows the winning modal', () => {
    mockedUseGameLogic.mockReturnValue({
      status: GameStatus.stopped,
      start: jest.fn(),
      stop: jest.fn(),
      swipe: jest.fn(),
      tiles: tilesAlmostFinished,
      movesCount: 52,
      gameTime: 61,
      winner: true,
    });

    render(<Game />, {
      wrapper: themeWrapper,
    });

    screen.getByRole('presentation', {name: 'New Record'});

    expect(
        screen.getByRole('timer', {name: 'Best Time'}).textContent,
    ).toBe('0:01:01');
    expect(
        screen.getByRole('status', {name: 'Best Moves'}).textContent,
    ).toBe('52');
  });
});
