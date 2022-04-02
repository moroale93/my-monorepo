import React from 'react';

import Tile from '.';

export default {title: 'Components/Tile', component: Tile};

export const Default = (): React.ReactElement => (
  <Tile x={1} y={1}>12</Tile>
);
