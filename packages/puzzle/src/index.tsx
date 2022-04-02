/* istanbul ignore file */
import {CssBaseline, ThemeProvider} from '@mui/material';
import ReactDOM from 'react-dom';

import Game from './components/Game';
import theme from './theme';

ReactDOM.render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Game />
    </ThemeProvider>,
    document.getElementById('root'),
);
