import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ClickAwayListener } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import NavContainerStyles from './nav-container.styles';
import { FullDrawer } from '../../../components/full-drawer';
import { MiniDrawer } from '../../../components/mini-drawer';
import { ActionBar } from '../../../components/action-bar';
import GoogleUser from '../../../models/google-user.model';
import NavigationItems from '../../../utils/navigation-items';

const useStyles = makeStyles(NavContainerStyles);

const NavContainer = (props) => {
  const classes = useStyles();
  const {
    closeDrawer,
    title,
    drawerIsOpen,
    toggleDrawer,
    user,
    handleLogout,
    isEditable,
    handleOpenAddGroupDialog,
    handleOpenAddImageDialog,
  } = props;

  return (
    <Fragment>
      <ClickAwayListener onClickAway={closeDrawer}>
        {/* This div is needed because the ClickAwayListener needs a ref to bind to */}
        <div>
          <ActionBar
            title={title}
            user={user}
            elevateOnScroll
            showAddGroup={isEditable}
            showAddPhoto={isEditable}
            handleAddGroup={handleOpenAddGroupDialog}
            handleAddPhoto={handleOpenAddImageDialog}
            showAvatar={isEditable}
            handleNav={toggleDrawer}
            handleLogout={handleLogout}
          />
          <FullDrawer isOpen={drawerIsOpen} handleClose={closeDrawer} items={NavigationItems} />
          <MiniDrawer />
        </div>
      </ClickAwayListener>
      <div className={classes.toolbar} />
    </Fragment>
  );
};

NavContainer.propTypes = {
  closeDrawer: PropTypes.func,
  title: PropTypes.string,
  drawerIsOpen: PropTypes.bool,
  toggleDrawer: PropTypes.func,
  user: PropTypes.instanceOf(GoogleUser),
  handleLogout: PropTypes.func,
  isEditable: PropTypes.bool,
  handleOpenAddGroupDialog: PropTypes.func,
  handleOpenAddImageDialog: PropTypes.func,
};

NavContainer.defaultProps = {
  closeDrawer: () => { },
  title: '',
  drawerIsOpen: false,
  toggleDrawer: () => { },
  user: undefined,
  handleLogout: () => { },
  isEditable: false,
  handleOpenAddGroupDialog: () => { },
  handleOpenAddImageDialog: () => { },
};

export default NavContainer;
