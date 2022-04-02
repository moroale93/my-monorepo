/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
import {useCallback, useEffect, useReducer, useState} from 'react';

import {BLANK, Direction, Tile} from '../../types';
import {
  getBottomTileIndex,
  getLeftTileIndex,
  getRightTileIndex,
  getTopTileIndex,
} from '../../utils/tilesFinder';
import useTimer from '../useTimer';

export enum GameStatus {
  stopped,
  running,
}

interface UseGameLogicResult {
  status: GameStatus;
  start: (tiles: Tile[]) => void;
  stop: () => void;
  swipe: (direction: Direction) => void;
  tiles?: Tile[];
  movesCount: number;
  gameTime: number;
  winner: boolean;
}
type Action =
 | { type: 'updateTiles', payload: Tile[] }
 | { type: 'setWinner', payload: boolean }
 | { type: 'switchTiles', aPos: number, bPos: number };

interface State {
  tiles: Tile[] | undefined;
  moves: number;
  winner: boolean;
  edgeLength: number;
}

function reducer(state: State, action: Action): State {
  /* istanbul ignore next */
  switch (action.type) {
    case 'setWinner':
      return {
        ...state,
        winner: action.payload,
      };
    case 'updateTiles':
      return {
        ...state,
        moves: 0,
        winner: false,
        tiles: [...action.payload],
        edgeLength: Math.sqrt(action.payload.length),
      };
    case 'switchTiles':
      if (!state.tiles) return state;
      const newList = [...state.tiles];
      const tmp = newList[action.aPos];
      newList[action.aPos] = newList[action.bPos];
      newList[action.bPos] = tmp;
      return {
        ...state,
        tiles: newList,
        moves: state.moves + 1,
      };
    default:
      /* istanbul ignore next */
      throw new Error();
  }
}

export default function useGameLogic(): UseGameLogicResult {
  const [
    {tiles, moves, edgeLength, winner}, updateState] = useReducer(reducer, {
    tiles: undefined,
    moves: 0,
    edgeLength: 0,
    winner: false,
  });
  const [gameTime, {start: startTimer, stop: stopTimer}] = useTimer();
  const [status, setStatus] = useState(GameStatus.stopped);

  useEffect(() => {
    if (status === GameStatus.running) {
      startTimer();
      return;
    }
    stopTimer();
  }, [status]);

  const startHandler = useCallback((boardTiles: Tile[]): void => {
    updateState({type: 'updateTiles', payload: boardTiles});
    setStatus(GameStatus.running);
  }, [updateState, setStatus]);

  const stopHandler = useCallback((): void => {
    setStatus(GameStatus.stopped);
  }, [setStatus]);

  const swipeHandler = useCallback((direction: Direction): void => {
    if (!tiles) return;
    const holePosition = tiles.findIndex((t) => t.id === BLANK);
    /* istanbul ignore next */
    switch (direction) {
      case Direction.bottomToTop:
        const bottomTile = getBottomTileIndex(holePosition, edgeLength);
        if (bottomTile === -1) return;
        updateState(
            {type: 'switchTiles', aPos: holePosition, bPos: bottomTile});
        break;
      case Direction.leftToRight:
        const leftTile = getLeftTileIndex(holePosition, edgeLength);
        if (leftTile === -1) return;
        updateState({type: 'switchTiles', aPos: holePosition, bPos: leftTile});
        break;
      case Direction.topToBottom:
        const topTile = getTopTileIndex(holePosition, edgeLength);
        if (topTile === -1) return;
        updateState({type: 'switchTiles', aPos: holePosition, bPos: topTile});
        break;
      case Direction.rightToLeft:
        const rightTile = getRightTileIndex(holePosition, edgeLength);
        if (rightTile === -1) return;
        updateState({type: 'switchTiles', aPos: holePosition, bPos: rightTile});
        break;
      default:
        /* istanbul ignore next */
        break;
    }
  }, [tiles, edgeLength, updateState]);

  useEffect(() => {
    if (!tiles) {
      return;
    }
    const last = tiles[tiles.length - 1];
    if (last.value !== BLANK) {
      return;
    }
    if ((tiles.slice(0, tiles.length - 1))
        .reduce((result, tile, index) => (
          result && tile.value === `${index + 1}`
        ), true)
    ) {
      updateState({type: 'setWinner', payload: true});
      stopTimer();
      setStatus(GameStatus.stopped);
    }
  }, [tiles]);

  return {
    status,
    start: startHandler,
    stop: stopHandler,
    swipe: swipeHandler,
    tiles,
    movesCount: moves,
    gameTime,
    winner,
  };
}
