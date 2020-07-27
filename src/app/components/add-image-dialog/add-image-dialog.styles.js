const AddImageDialogStyles = theme => ({
  imgContainer: {
    height: theme.image.height.small,
    maxWidth: theme.image.height.small * 2,
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
  },
  img: {
    objectFit: 'cover',
    height: '100%',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

export default AddImageDialogStyles;
