import {useEffect, useCallback} from 'react';
import {Box, Button, Typography} from '@mui/material';

import GameBoard from '../GameBoard';
import Tile from '../Tile';
import {BLANK, Tile as TypeType} from '../../types';
import tilesGenerator from '../../utils/tilesGenerator';
import useGameLogic, {GameStatus} from '../../hooks/useGameLogic';
import useDirectionalCommands from '../../hooks/useDirectionalCommands';
import useRecordScore from '../../hooks/useRecordScore';
import ScoreBoard from '../ScoreBoard';
import {TILE_MARGIN, TILE_SIZE} from '../../consts';
import WinningModal from '../WinningModal';
import {getDirectionForBlankPosition} from '../../utils/tilesFinder';

export default function Game({edgeLength = 5}: { edgeLength?: number }) {
  const {
    saveNewRecord,
    movesCount: movesCountRecord,
    gameTime: gameTimeRecord,
  } = useRecordScore();
  const {
    gameTime,
    movesCount,
    status,
    swipe,
    tiles,
    winner,
    start,
    stop,
  } = useGameLogic();
  useDirectionalCommands(swipe);

  useEffect(() => {
    saveNewRecord({gameTime, movesCount});
  }, [winner]);

  const handleStart = useCallback(() => {
    start(tilesGenerator(edgeLength));
  }, [edgeLength]);

  const handleTileClick = useCallback((position: number, board: TypeType[]) => {
    const newPosition = getDirectionForBlankPosition(
        board, position, edgeLength);
    if (newPosition) {
      swipe(newPosition);
    }
  }, [edgeLength, swipe]);

  return (
    <Box
      sx={{
        maxWidth: `${(TILE_SIZE + TILE_MARGIN * 2) * edgeLength}px`,
        margin: '0 auto',
        top: '50%',
        left: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          margin: `${TILE_MARGIN}px`,
        }}
      >
        {status === GameStatus.stopped && (
          <Button variant="contained" color="primary" onClick={handleStart}>
            Start
          </Button>
        )}
        {status === GameStatus.running && (
          <Button variant="contained" color="secondary" onClick={stop}>
            Stop
          </Button>
        )}
        <ScoreBoard movesCount={movesCount} gameTime={gameTime} />
      </Box>
      <GameBoard edgeLength={edgeLength} m="0 auto">
        {tiles?.map(({value, id}, index) => (id === BLANK ?
          null :
          (
            <Tile
              key={id}
              y={Math.floor(index / edgeLength)}
              x={index % edgeLength}
              onClick={() => handleTileClick(index, tiles)}
            >
              {value}
            </Tile>
          )
        ))}
      </GameBoard>
      <WinningModal open={winner}>
        <Box>
          <Typography variant="h5" textAlign="center" id="modal-modal-title">
            {(gameTime === gameTimeRecord || movesCount === movesCountRecord) ?
              'New Record' : 'You won'}
          </Typography>
          <ScoreBoard
            labelPrefix="Best "
            movesCount={movesCountRecord}
            gameTime={gameTimeRecord}
            sx={{
              backgroundColor: 'common.white',
              color: 'common.black', margin: '0 auto',
            }}
          />
          <Button variant="contained" color="primary" onClick={handleStart}>
            Play again
          </Button>
        </Box>
      </WinningModal>
    </Box>
  );
}
