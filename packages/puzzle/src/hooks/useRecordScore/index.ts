import {useCallback, useState} from 'react';
import {RecordValues} from '../../types';

interface UseRecordScoreResult {
  saveNewRecord: (values: { movesCount: number; gameTime: number; }) => void;
  movesCount: number;
  gameTime: number;
}

const KEY_MOVE = 'RECORD_MOVE';
const KEY_TIME = 'RECORD_TIME';

export default function useRecordScore(): UseRecordScoreResult {
  const [bestMovesCount, setMovesCount] = useState<number>(
      parseInt(localStorage.getItem(KEY_MOVE) || '0', 10));
  const [bestGameTime, setGameTime] = useState<number>(
      parseInt(localStorage.getItem(KEY_TIME) || '0', 10));

  const saveNewRecordHandler = useCallback(({
    gameTime,
    movesCount,
  }: RecordValues): void => {
    if (bestMovesCount < movesCount) {
      setMovesCount(movesCount);
      localStorage.setItem(KEY_TIME, `${movesCount}`);
    }
    if (bestGameTime < gameTime) {
      setGameTime(gameTime);
      localStorage.setItem(KEY_MOVE, `${gameTime}`);
    }
  }, [bestMovesCount, bestGameTime, setMovesCount, setGameTime]);

  return {
    saveNewRecord: saveNewRecordHandler,
    movesCount: bestMovesCount,
    gameTime: bestGameTime,
  };
}
