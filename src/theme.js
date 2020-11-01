import { red } from '@material-ui/core/colors';
import { createMuiTheme, withTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1df5c6',
    },
    secondary: {
      main: '#gb3780',
      contrastText: "black",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
