import React from 'react';

import ScoreBoard from '.';

export default {title: 'Components/ScoreBoard', component: ScoreBoard};

export const Default = (): React.ReactElement => (
  <ScoreBoard movesCount={0} gameTime={0} />
);
