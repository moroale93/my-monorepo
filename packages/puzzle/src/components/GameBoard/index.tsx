import {useMemo} from 'react';
import {Box, BoxProps} from '@mui/material';
import {styled} from '@mui/system';

import {TILE_SIZE, TILE_MARGIN} from '../../consts';

interface GameBoardProps extends BoxProps {
  edgeLength: number;
}

const TileHole = styled(Box)<BoxProps>(({theme}) => ({
  flex: `1 1 ${TILE_SIZE}px`,
  boxSizing: 'border-box',
  margin: TILE_MARGIN,
  backgroundColor: theme.palette.background.paper,
  borderRadius: '4px',
}));

export default function GameBoard({
  edgeLength, children, ...props}: GameBoardProps) {
  const backgroundTiles = useMemo(
      () => new Array(edgeLength * edgeLength)
          .fill(0).map((_, index) => index), [edgeLength],
  );

  return (
    <Box
      sx={{
        width: (TILE_SIZE + TILE_MARGIN * 2) * edgeLength,
        height: (TILE_SIZE + TILE_MARGIN * 2) * edgeLength,
        display: 'flex',
        flexWrap: 'wrap',
      }}
      {...props}
    >
      {backgroundTiles.map((i) => <TileHole
        key={i}
        width={TILE_SIZE}
        height={TILE_SIZE}
      />)}
      {children}
    </Box>
  );
}
