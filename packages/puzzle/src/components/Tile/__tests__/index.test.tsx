import {act, render, screen, fireEvent} from '@testing-library/react';

import Tile from '..';

describe('Tile', () => {
  it('renders correctly', () => {
    render(<Tile x={3} y={2}>12</Tile>);

    screen.getByRole('button', {name: '12'});
  });

  it('applies props to the button', () => {
    const onClickMock = jest.fn();
    render(<Tile x={3} y={2} onClick={onClickMock}>12</Tile>);

    act(() => {
      fireEvent.click(screen.getByRole('button', {name: '12'}));
    });

    expect(onClickMock).toHaveBeenCalled();
  });
});
