import {BLANK, Direction, Tile} from '../types';
import {
  isOnBottomEdge,
  isOnLeftEdge,
  isOnRightEdge,
  isOnTopEdge,
} from './positionChecks';

export function getBottomTileIndex(
    tilePosition: number, edgeLength: number): number {
  if (isOnBottomEdge(tilePosition, edgeLength)) return -1;
  return tilePosition + edgeLength;
}

export function getTopTileIndex(
    tilePosition: number, edgeLength: number): number {
  if (isOnTopEdge(tilePosition, edgeLength)) return -1;
  return tilePosition - edgeLength;
}

export function getLeftTileIndex(
    tilePosition: number, edgeLength: number): number {
  if (isOnLeftEdge(tilePosition, edgeLength)) return -1;
  return tilePosition - 1;
}

export function getRightTileIndex(
    tilePosition: number, edgeLength: number): number {
  if (isOnRightEdge(tilePosition, edgeLength)) return -1;
  return tilePosition + 1;
}

export function getDirectionForBlankPosition(
    tiles: Tile[],
    tilePosition: number,
    edgeLength: number,
): Direction | undefined {
  if (!isOnRightEdge(tilePosition, edgeLength) &&
    tiles[getRightTileIndex(tilePosition, edgeLength)].value === BLANK) {
    return Direction.leftToRight;
  }
  if (!isOnLeftEdge(tilePosition, edgeLength) &&
    tiles[getLeftTileIndex(tilePosition, edgeLength)].value === BLANK) {
    return Direction.rightToLeft;
  }
  if (!isOnTopEdge(tilePosition, edgeLength) &&
    tiles[getTopTileIndex(tilePosition, edgeLength)].value === BLANK) {
    return Direction.bottomToTop;
  }
  if (!isOnBottomEdge(tilePosition, edgeLength) &&
    tiles[getBottomTileIndex(tilePosition, edgeLength)].value === BLANK) {
    return Direction.topToBottom;
  }
}
