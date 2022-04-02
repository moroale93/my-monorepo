import {render, screen} from '@testing-library/react';

import WinningModal from '..';

describe('WinningModal', () => {
  it('renders correctly', () => {
    render(
        <WinningModal
          open
          id="modal-modal-title"
        >
          <h5>Hello World</h5>
        </WinningModal>,
    );

    screen.getByRole('presentation', {name: 'Hello World'});
  });

  it('renders nothing', () => {
    render(<WinningModal open={false} id="modal-modal-title">
      <h5>Hello World</h5></WinningModal>);

    expect(
        screen.queryByRole('presentation', {name: 'Hello World'})).toBeNull();
  });
});
