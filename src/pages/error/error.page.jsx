import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Button, Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import ErrorPageStyles from './error.styles';

const useStyles = makeStyles(ErrorPageStyles);

const ErrorPage = (props) => {
  const classes = useStyles();
  const {
    title, details, actionButtonTitle, actionButtonLink,
  } = props;

  return (
    <Fragment>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.container}
      >
        <Grid item className={classes.item}>
          <Typography variant="h1" align="center" gutterBottom>{title}</Typography>
          <Typography align="center">{details}</Typography>
        </Grid>
        <Grid item className={classes.item}>
          <Link to={actionButtonLink} className={classes.link}>
            <Button variant="outlined">{actionButtonTitle}</Button>
          </Link>
        </Grid>
      </Grid>
    </Fragment>
  );
};

ErrorPage.propTypes = {
  title: PropTypes.string,
  details: PropTypes.string,
  actionButtonTitle: PropTypes.string,
  actionButtonLink: PropTypes.string,
};

ErrorPage.defaultProps = {
  title: 'Unknown Error',
  details: 'There was an unknown error with your request.',
  actionButtonTitle: 'Back to home',
  actionButtonLink: '/',
};

export default ErrorPage;
