const GroupListPageStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  progressBarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // I know... this is weird, but couldn't figure out how to fill the remaining space
    marginTop: theme.spacing(20),
  },
});

export default GroupListPageStyles;
