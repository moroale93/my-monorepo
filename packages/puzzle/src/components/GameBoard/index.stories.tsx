import React from 'react';

import GameBoard from '.';

export default {title: 'Components/GameBoard', component: GameBoard};

export const Default = (): React.ReactElement => (
  <GameBoard
    edgeLength={5}
  />
);
