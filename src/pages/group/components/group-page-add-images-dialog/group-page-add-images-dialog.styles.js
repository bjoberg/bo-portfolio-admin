const GroupPageAddImagesDialog = theme => ({
  toolbar: theme.mixins.toolbar,
  dialogContentContainer: {
    position: 'relative',
    overflow: 'scroll',
  },
  dialogContent: {
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
});

export default GroupPageAddImagesDialog;
