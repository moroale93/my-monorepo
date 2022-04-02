import {render, screen} from '@testing-library/react';

import themeWrapper from '../../../testing/utils/themeWrapper';
import ScoreBoard from '..';

describe('ScoreBoard', () => {
  it('renders correctly', () => {
    render(
        <ScoreBoard movesCount={5} gameTime={3} />,
        {wrapper: themeWrapper},
    );

    expect(
        screen.getByRole('timer', {name: 'Time'}).textContent).toBe('0:00:03');
    expect(screen.getByRole('status', {name: 'Moves'}).textContent).toBe('5');
  });

  it('renders correctly with label prefix', () => {
    render(
        <ScoreBoard movesCount={5} gameTime={3} labelPrefix="Best " />,
        {wrapper: themeWrapper},
    );

    expect(
        screen.getByRole('timer', {name: 'Best Time'}).textContent,
    ).toBe('0:00:03');
    expect(
        screen.getByRole('status', {name: 'Best Moves'}).textContent).toBe('5');
  });
});
