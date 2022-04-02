import {styled, TypographyProps, useTheme} from '@mui/system';
import {Box, BoxProps} from '@mui/material';

import {TILE_MARGIN} from '../../consts';
import {getTime} from '../../utils/format';

interface ScoreBoardProps extends BoxProps {
  movesCount: number;
  gameTime: number;
  labelPrefix?: string,
}

const Label = styled('label')<TypographyProps>(() => ({
  fontSize: '0.7rem',
  textTransform: 'uppercase',
}));
const Numbers = styled('div')<TypographyProps>(() => ({
  fontSize: '1.5rem',
  lineHeight: 1,
  minWidth: '77px',
}));

export default function ScoreBoard({
  movesCount,
  gameTime,
  sx,
  labelPrefix = '',
  ...props
}: ScoreBoardProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: '4px',
        display: 'flex',
        width: 'fit-content',
        padding: '6px 7px',
        flexDirection: 'row',
        textAlign: 'right',
        color: theme.palette.common.white,
        marginLeft: `${TILE_MARGIN * 2}px`,
        paddingTop: 0,
        ...sx,
      }}
      {...props}
    >
      <Box mr={1}>
        <Label id={`${labelPrefix.replace(/\s/g, '-').toLowerCase()}-time`}>
          {`${labelPrefix}Time`}
        </Label>
        <Numbers
          role="timer"
          aria-labelledby={
            `${labelPrefix.replace(/\s/g, '-').toLowerCase()}-time`
          }
        >
          {getTime(gameTime)}
        </Numbers>
      </Box>
      <Box>
        <Label id={`${labelPrefix.replace(/\s/g, '-').toLowerCase()}-moves`}>
          {`${labelPrefix}Moves`}
        </Label>
        <Numbers
          role="status"
          aria-labelledby={
            `${labelPrefix.replace(/\s/g, '-').toLowerCase()}-moves`
          }
        >
          {movesCount}
        </Numbers>
      </Box>
    </Box>
  );
}
