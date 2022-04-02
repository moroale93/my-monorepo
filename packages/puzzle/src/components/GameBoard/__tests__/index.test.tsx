import {render, screen} from '@testing-library/react';

import themeWrapper from '../../../testing/utils/themeWrapper';
import GameBoard from '..';

describe('GameBoard', () => {
  it('renders correctly', () => {
    render(
        <GameBoard edgeLength={5}>GameBoard</GameBoard>,
        {wrapper: themeWrapper},
    );

    screen.getByText('GameBoard');
  });
});
