const GroupItemStyles = theme => ({
  root: {
    height: theme.image.height.large,
    maxWidth: theme.image.height.large,
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[100],
    position: 'relative',
  },
  imgContainer: {
    display: 'block',
    borderRadius: theme.shape.borderRadius,
  },
  textContainer: {
    paddingTop: theme.spacing(1),
  },
  img: {
    position: 'absolute',
    objectFit: 'cover',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  actionBar: {
    position: 'absolute',
    right: 0,
    zIndex: theme.zIndex.appBar - 1,
  },
});

export default GroupItemStyles;
