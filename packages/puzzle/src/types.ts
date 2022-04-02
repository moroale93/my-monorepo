/* eslint-disable no-unused-vars */
export enum Direction {
  rightToLeft = 'left',
  leftToRight = 'right',
  topToBottom = 'bottom',
  bottomToTop = 'top',
}

export interface Tile {
  id: string;
  value: string;
}

export const BLANK = 'blank';

export interface RecordValues {
  movesCount: number;
  gameTime: number;
}
