import {BLANK, Tile} from '../types';
import shuffleArray from './shuffleArray';

export default function tilesGenerator(columns: number): Tile[] {
  const tilesValues = new Array((columns * columns) - 1)
      .fill(0)
      .map<number>((_, index) => (index + 1));
  shuffleArray(tilesValues);

  return [
    ...tilesValues.map<Tile>((value) => ({
      value: `${value}`,
      id: `${value}`,
    })),
    {
      id: BLANK,
      value: BLANK,
    },
  ];
}
