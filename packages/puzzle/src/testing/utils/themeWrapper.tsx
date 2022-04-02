import React from 'react';
import {CssBaseline, ThemeProvider} from '@mui/material';

import theme from '../../theme';

const themeWrapper: React.ComponentType = ({children}) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    { children }
  </ThemeProvider>
);

export default themeWrapper;
