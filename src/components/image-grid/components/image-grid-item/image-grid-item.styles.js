const ImageGridItemStyles = theme => ({
  root: {
    height: theme.image.height.large,
    maxWidth: 600,
    backgroundColor: theme.palette.grey[100],
    margin: theme.spacing(0.5),
    overflow: 'hidden',
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shortest,
    }),
    [theme.breakpoints.down('sm')]: {
      height: theme.image.height.small,
      maxWidth: 400,
    },
  },
  actionBar: {
    position: 'absolute',
  },
  selected: {
    outline: `2px solid ${theme.palette.secondary.main}`,
  },
  img: {
    objectFit: 'cover',
    height: '100%',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

export default ImageGridItemStyles;
