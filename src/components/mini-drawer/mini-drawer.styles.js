import { miniDrawerWidth } from '../../utils/theme';

const MiniDrawerStyles = theme => ({
  drawer: {
    minWidth: miniDrawerWidth,
    flexShrink: 0,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    zIndex: theme.zIndex.appBar - 1,
    minWidth: miniDrawerWidth,
    backgroundColor: theme.palette.common.white,
    border: 0,
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
  },
});

export default MiniDrawerStyles;
