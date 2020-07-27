import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import GroupListPage from './pages/group-list/group-list.page';
import ErrorPage from './pages/error/error.page';
import ImageListPage from './pages/image-list/image-list.page';
import LoginPage from './pages/login/login.page';
import HomePage from './pages/home/home.page';
import GroupPage from './pages/group/group.page';
import GoogleUser from './models/google-user.model';

const Routes = (props) => {
  const {
    openSnackbar, toggleNavContainer, isEditable, user, handleLogout,
  } = props;

  const appTitle = 'Brett Oberg Photography';

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(routeProps) => {
          toggleNavContainer(true);
          return (
            <Fragment>
              <Helmet>
                <title>{appTitle}</title>
              </Helmet>
              <HomePage {...routeProps} />
            </Fragment>
          );
        }}
      />
      <Route
        exact
        path="/login"
        render={(routeProps) => {
          toggleNavContainer(true);
          return (
            <Fragment>
              <Helmet>
                <title>{`Login - ${appTitle}`}</title>
              </Helmet>
              <LoginPage {...routeProps} />
            </Fragment>
          );
        }}
      />
      <Route
        exact
        path="/images"
        render={(routeProps) => {
          toggleNavContainer(true);
          return (
            <Fragment>
              <Helmet>
                <title>{`Images - ${appTitle}`}</title>
              </Helmet>
              <ImageListPage
                {...routeProps}
                openSnackbar={openSnackbar}
              />
            </Fragment>
          );
        }}
      />
      <Route
        exact
        path="/groups"
        render={(routeProps) => {
          toggleNavContainer(true);
          return (
            <Fragment>
              <Helmet>
                <title>{`Groups - ${appTitle}`}</title>
              </Helmet>
              <GroupListPage
                {...routeProps}
                isEditable={isEditable}
                openSnackbar={openSnackbar}
              />
            </Fragment>
          );
        }}
      />
      <Route
        path="/group/:id"
        render={(routeProps) => {
          toggleNavContainer(false);
          return (
            <Fragment>
              <Helmet>
                <title>{appTitle}</title>
              </Helmet>
              <GroupPage
                {...routeProps}
                appTitle={appTitle}
                openSnackbar={openSnackbar}
                isEditable={isEditable}
                user={user}
                handleLogout={handleLogout}
              />
            </Fragment>
          );
        }}
      />
      <Route render={() => (
        <Fragment>
          <Helmet>
            <title>{`Error - ${appTitle}`}</title>
          </Helmet>
          <ErrorPage />
        </Fragment>
      )}
      />
    </Switch>
  );
};

Routes.propTypes = {
  openSnackbar: PropTypes.func.isRequired,
  toggleNavContainer: PropTypes.func.isRequired,
  isEditable: PropTypes.bool,
  user: PropTypes.instanceOf(GoogleUser),
  handleLogout: PropTypes.func,
};

Routes.defaultProps = {
  isEditable: false,
  user: undefined,
  handleLogout: () => { },
};

export default Routes;
