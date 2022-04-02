import {render} from '@testing-library/react';
import ComponentSyncher from '..';

describe('ComponentSyncher', () => {
  it('doesn\'t render if no messages has been synched', () => {
    const SynchedComponentFoo = jest.fn();
    render(
        <ComponentSyncher appName="app">
          {SynchedComponentFoo}
        </ComponentSyncher>,
    );

    expect(SynchedComponentFoo).not.toHaveBeenCalled();
  });
});
