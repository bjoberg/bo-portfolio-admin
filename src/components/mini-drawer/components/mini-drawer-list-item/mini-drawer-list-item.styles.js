import { miniDrawerWidth } from '../../../../utils/theme';

const MiniDrawerListItemStyles = theme => ({
  link: {
    minWidth: miniDrawerWidth,
    minHeight: miniDrawerWidth,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      borderRadius: miniDrawerWidth,
    },
    textDecoration: 'none',
    color: theme.palette.grey[700],
  },
  linkIsActive: {
    textDecoration: 'none',
    color: theme.palette.primary.dark,
  },
});

export default MiniDrawerListItemStyles;
