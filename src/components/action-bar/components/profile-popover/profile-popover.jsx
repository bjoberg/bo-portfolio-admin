import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Popover, Typography, List, ListItem, ListItemText, Divider,
} from '@material-ui/core';

import ProfilePopoverStyles from './profile-popover.styles';

const useStyles = makeStyles(ProfilePopoverStyles);

const ProfilePopover = (props) => {
  const classes = useStyles();
  const {
    isOpen, anchorEl, handleClose, handleLogout, name, email, role,
  } = props;

  return (
    <Popover
      id="profile-popover"
      open={isOpen}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <div className={classes.container}>
        <Typography variant="subtitle1">
          {name}
        </Typography>
        <Typography variant="subtitle2">
          {email}
        </Typography>
        <Typography variant="subtitle2">
          {`Role: ${role}`}
        </Typography>
      </div>
      <Divider />
      <List component="nav" dense aria-label="sign out">
        <ListItem button onClick={handleLogout}>
          <ListItemText primary="Sign out" />
        </ListItem>
      </List>
    </Popover>
  );
};

ProfilePopover.propTypes = {
  isOpen: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func,
  handleLogout: PropTypes.func,
  name: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string,
};

ProfilePopover.defaultProps = {
  isOpen: false,
  anchorEl: {},
  handleClose: () => { },
  handleLogout: () => { },
  name: undefined,
  email: undefined,
  role: undefined,
};

export default ProfilePopover;
