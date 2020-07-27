import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import LoginPageStyles from './login.styles';
import GoogleLoginButton from '../../components/google-login-button';
import AuthService from '../../services/auth.service';

const useStyles = makeStyles(LoginPageStyles);

const LoginPage = () => {
  const classes = useStyles();
  const loginButtonOnClick = () => AuthService.loginGoogle();

  return (
    <div className={classes.container}>
      <GoogleLoginButton handleOnClick={loginButtonOnClick} />
    </div>
  );
};

export default LoginPage;
