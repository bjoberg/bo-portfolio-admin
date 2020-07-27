import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';

import ProfileMenuStyles from './profile-menu.styles';
import ProfilePopover from '../profile-popover/profile-popover';
import GoogleUser from '../../../../models/google-user.model';

const useStyles = makeStyles(ProfileMenuStyles);

const ProfileMenu = (props) => {
  const classes = useStyles();
  const { user, handleLogout } = props;
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const popoverIsOpen = Boolean(popoverAnchorEl);

  const handleIconButtonOnClick = event => setPopoverAnchorEl(event.currentTarget);
  const handleMenuClose = () => setPopoverAnchorEl(null);

  let avatar;

  if (user) {
    if (user.picture) {
      avatar = (
        <Avatar
          alt={user.name}
          src={user.picture}
          className={classes.avatar}
        />
      );
    } else {
      avatar = (<AccountCircle />);
    }
  }

  if (user) {
    return (
      <Fragment>
        <IconButton
          color="inherit"
          className={classes.iconButton}
          onClick={handleIconButtonOnClick}
        >
          {avatar}
        </IconButton>
        <ProfilePopover
          isOpen={popoverIsOpen}
          anchorEl={popoverAnchorEl}
          handleClose={handleMenuClose}
          handleLogout={handleLogout}
          name={user.name}
          email={user.email}
          role={user.role}
        />
      </Fragment>
    );
  }
  return null;
};

ProfileMenu.propTypes = {
  handleLogout: PropTypes.func,
  user: PropTypes.instanceOf(GoogleUser),
};

ProfileMenu.defaultProps = {
  handleLogout: () => { },
  user: undefined,
};

export default ProfileMenu;
