import {Direction} from '../../types';
import {noop} from '../../consts';
import useKeyPress from '../useKeyPress';
import useTouchSwipes from '../useTouchSwipes';

export default function useDirectionalCommands(
    onSwipe: (direction: Direction) => void = noop,
): void {
  useTouchSwipes(onSwipe);
  useKeyPress('ArrowLeft', () => onSwipe(Direction.rightToLeft));
  useKeyPress('ArrowUp', () => onSwipe(Direction.bottomToTop));
  useKeyPress('ArrowRight', () => onSwipe(Direction.leftToRight));
  useKeyPress('ArrowDown', () => onSwipe(Direction.topToBottom));
  // todo: touch events
}
