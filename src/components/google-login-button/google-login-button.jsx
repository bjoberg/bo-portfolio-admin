import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GoogleLoginButtonStyles from './google-login-button.styles';
import * as GoogleSignInButton from '../../media/google-sign-in-button.png';

const useStyles = makeStyles(GoogleLoginButtonStyles);

const GoogleLoginButton = (props) => {
  const classes = useStyles();
  const { handleOnClick } = props;

  return (
    <Button
      variant="contained"
      className={classes.button}
      onClick={() => handleOnClick()}
    >
      <img className={classes.img} alt="google-logo" src={GoogleSignInButton} />
    </Button>
  );
};

GoogleLoginButton.propTypes = {
  handleOnClick: PropTypes.func,
};

GoogleLoginButton.defaultProps = {
  handleOnClick: () => { },
};

export default GoogleLoginButton;
