export function getTime(seconds: number): string {
  // eslint-disable-next-line max-len
  return `${Math.floor(seconds / 3600)}:${(`00${Math.floor(seconds / 60) % 60}`).slice(-2)}:${(`00${seconds % 60}`).slice(-2)}`;
}
