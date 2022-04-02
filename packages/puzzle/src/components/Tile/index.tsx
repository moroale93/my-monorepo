import {Box, BoxProps, useTheme} from '@mui/material';

import {TILE_MARGIN, TILE_SIZE} from '../../consts';

interface TileProps extends BoxProps {
  x: number;
  y: number;
}

export default function Tile({x, y, children, ...props}: TileProps) {
  const theme = useTheme();
  const xPx = TILE_MARGIN + x * (TILE_SIZE + TILE_MARGIN * 2);
  const yPx = TILE_MARGIN + y * (TILE_SIZE + TILE_MARGIN * 2);

  return (
    <Box
      sx={{
        fontSize: 32,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.grey[700],
        position: 'absolute',
        lineHeight: '100%',
        width: `${TILE_SIZE}px`,
        height: `${TILE_SIZE}px`,
        borderRadius: '4px',
        textAlign: 'center',
        padding: '10px',
        boxSizing: 'border-box',
        transition: 'transform 0.15s ease-in-out 0s',
        transform: `translate(${xPx}px, ${yPx}px)`,
      }}
      role="button"
      {...props}
    >
      {children}
    </Box>
  );
}
