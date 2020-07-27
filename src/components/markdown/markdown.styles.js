const MarkdownStyles = theme => ({
  '@global': {
    h1: {
      ...theme.typography.h1,
      marginTop: 0,
    },
    h2: {
      ...theme.typography.h2,
    },
    h3: {
      ...theme.typography.h3,
    },
    h4: {
      ...theme.typography.h4,
    },
    h5: {
      ...theme.typography.h5,
    },
    h6: {
      ...theme.typography.h6,
    },
    p: {
      ...theme.typography.body1,
    },
    a: {
      color: theme.palette.primary.main,
    },
  },
});

export default MarkdownStyles;
