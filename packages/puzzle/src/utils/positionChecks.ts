export function getCartesianCoordinates(
    index: number,
    edgeLength: number,
): { x: number, y: number } {
  return {
    y: Math.floor(index / edgeLength),
    x: index % edgeLength,
  };
}

export function isOnLeftEdge(index: number, edgeLength: number) {
  return getCartesianCoordinates(index, edgeLength).x === 0;
}

export function isOnTopEdge(index: number, edgeLength: number) {
  return getCartesianCoordinates(index, edgeLength).y === 0;
}

export function isOnRightEdge(index: number, edgeLength: number) {
  return getCartesianCoordinates(index, edgeLength).x === edgeLength - 1;
}

export function isOnBottomEdge(index: number, edgeLength: number) {
  return getCartesianCoordinates(index, edgeLength).y === edgeLength - 1;
}
