const FullDrawerListItemStyles = theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.grey[700],
    borderRadius: theme.shape.borderRadius,
  },
  linkIsActive: {
    textDecoration: 'none',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
    // Apply hover styles to all children
    // Styles applied here so we don't have to override theme for palette > action
    '&:hover > *': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  listItem: {
    backgroundColor: 'inherit',
    marginBottom: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
  listIcon: {
    color: 'inherit',
  },
});

export default FullDrawerListItemStyles;
