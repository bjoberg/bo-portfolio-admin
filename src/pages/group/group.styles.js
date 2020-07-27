const GroupPageStyles = theme => ({
  root: {
    minHeight: '100vh',
    width: '100%',
    backgroundColor: theme.palette.background.default,
    overflow: 'hidden',
  },
  gridContainer: {
    width: '100%',
    maxWidth: theme.breakpoints.values.lg,
    marginTop: theme.spacing(4),
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
    overflow: 'hidden',
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  toolbar: theme.mixins.toolbar,
});

export default GroupPageStyles;
