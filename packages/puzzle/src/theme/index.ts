import {createTheme} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#DCF763',
    },
    secondary: {
      main: '#d30000',
    },
    background: {
      default: '#435058',
      paper: '#2B353B',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          height: 53,
          fontSize: 25,
          lineHeight: 1,
          minWidth: 117,
        },
      },
    },
  },
});

export default theme;
