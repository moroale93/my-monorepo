import {BLANK, Tile} from '../../types';

export const tilesFinished: Tile[] = [
  ...new Array(24)
      .fill(0)
      .map<number>((_, index) => (index + 1))
      .map<Tile>((value) => ({
        value: `${value}`,
        id: `${value}`,
      })),
  {
    id: BLANK,
    value: BLANK,
  },
];

export const tilesAlmostFinished: Tile[] = [...tilesFinished];
const tmp = tilesAlmostFinished[24];
// eslint-disable-next-line prefer-destructuring
tilesAlmostFinished[24] = tilesAlmostFinished[23];
tilesAlmostFinished[23] = tmp;
