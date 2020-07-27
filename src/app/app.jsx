import React, {
  useState, useEffect, useCallback, Fragment,
} from 'react';
import { hot } from 'react-hot-loader';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Snackbar from '@material-ui/core/Snackbar';

import AppStyles from './app.styles';
import NavContainer from './components/nav-container/nav-container';
import Routes from '../routes';
import SnackbarContentWrapper from '../components/snackbar-content';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import GoogleUser from '../models/google-user.model';
import Roles from '../utils/roles';
import AddGroupDialog from './components/add-group-dialog/add-group-dialog';
import AddImageDialog from './components/add-image-dialog/add-image-dialog';

const useStyles = makeStyles(AppStyles);
const userService = new UserService();

const App = () => {
  const classes = useStyles();
  const title = 'Brett Oberg';

  const [user, setUser] = useState();
  const [isEditable, setIsEditable] = useState(false);
  const [displayNavContainer, setDisplayNavContainer] = useState(false);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState('success');
  const [snackbarContent, setSnackbarContent] = useState('');
  const [snackbarIsOpen, setSnackBarIsOpen] = useState(false);
  const [addGroupDialogIsOpen, setAddGroupDialogIsOpen] = useState(false);
  const [addImageDialogIsOpen, setAddImageDialogIsOpen] = useState(false);

  const toggleDrawer = () => setDrawerIsOpen(!drawerIsOpen);
  const closeDrawer = () => setDrawerIsOpen(false);
  const closeSnackbar = () => setSnackBarIsOpen(false);
  const logoutGoogle = () => AuthService.logoutGoogle();
  const closeAddGroupDialog = () => setAddGroupDialogIsOpen(false);
  const openAddGroupDialog = () => setAddGroupDialogIsOpen(true);
  const closeAddImageDialog = () => setAddImageDialogIsOpen(false);
  const openAddImageDialog = () => setAddImageDialogIsOpen(true);

  /**
   * Open the snackbar as a notification
   *
   * @param {string} variant of the snackbar to display
   * @param {string} message to display in the snackbar
   */
  const openSnackbar = (variant, message) => {
    setSnackbarStatus(variant);
    setSnackbarContent(message);
    setSnackBarIsOpen(true);
  };

  /**
   * Toggle the display state of the nav container
   *
   * @param {boolean} toggle hide / show the nav container
   */
  const toggleNavContainer = (toggle) => {
    if (toggle === displayNavContainer) return;
    setDisplayNavContainer(toggle);
  };

  /**
   * Attempt to retrieve and set the user's data
   */
  const setUserData = useCallback(async () => {
    try {
      const userInfo = await userService.getUserInfo();
      const roleInfo = await userService.getUserRole(userInfo.sub);
      const googleUser = new GoogleUser({ ...userInfo, ...roleInfo });
      setUser(googleUser.toJson());
    } catch (error) {
      setUser(undefined);
    }
  }, []);

  /**
   * Get the user's information when the application loads
   */
  useEffect(() => { setUserData(); }, [setUserData]);

  /**
   * Determine if ther user can edit application content
   */
  useEffect(() => {
    if (user === undefined || user === null) return;
    if (user.role === Roles.ADMIN) setIsEditable(true);
    else setIsEditable(false);
  }, [user]);

  return (
    <Fragment>
      {displayNavContainer && (
        <NavContainer
          closeDrawer={closeDrawer}
          title={title}
          drawerIsOpen={drawerIsOpen}
          toggleDrawer={toggleDrawer}
          user={user}
          handleLogout={logoutGoogle}
          isEditable={isEditable}
          handleOpenAddGroupDialog={openAddGroupDialog}
          handleOpenAddImageDialog={openAddImageDialog}
        />
      )}
      <main className={clsx(displayNavContainer ? classes.navContainer : classes.container)}>
        <Routes
          openSnackbar={openSnackbar}
          toggleNavContainer={toggleNavContainer}
          isEditable={isEditable}
          user={user}
          handleLogout={logoutGoogle}
        />
      </main>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbarIsOpen}
      >
        <SnackbarContentWrapper
          className={classes.snackbarMargin}
          onClose={closeSnackbar}
          variant={snackbarStatus}
          message={snackbarContent}
        />
      </Snackbar>
      <AddGroupDialog
        isOpen={addGroupDialogIsOpen}
        handleClose={closeAddGroupDialog}
        openSnackbar={openSnackbar}
      />
      <AddImageDialog
        isOpen={addImageDialogIsOpen}
        handleClose={closeAddImageDialog}
        openSnackbar={openSnackbar}
      />
    </Fragment>
  );
};

// eslint-disable-next-line
let hotApp = App;

if (process.env.NODE_ENV === 'development') {
  hotApp = hot(module)(App);
}

export default hotApp;
