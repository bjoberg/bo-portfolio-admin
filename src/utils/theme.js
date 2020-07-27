import { createMuiTheme } from '@material-ui/core/styles';
import { green, deepOrange, grey } from '@material-ui/core/colors';

const miniDrawerWidth = 60;
const drawerWidth = 250;

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: deepOrange,
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    h1: {
      fontSize: '4.25rem',
    },
    subtitle1: {
      fontWeight: 900,
    },
    subtitle2: {
      color: grey[700],
    },
  },
  image: {
    height: {
      small: 175,
      large: 250,
    },
  },
});

export {
  theme,
  miniDrawerWidth,
  drawerWidth,
};
